const { HttpError } = require("../../helpers");
const { Notice, categories } = require("../../models/notice");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  if (!categories.includes(category)) {
    next(HttpError(400, `Not Found`));
  }

  const counter = await Notice.find({ category }).count();
  const totalPage = Math.ceil(counter / limit);

  const data = await Notice.find({ category }, "", {
    skip,
    limit: Number(limit),
  }).populate({
    path: "owner",
    select: "id phone email",
  });

  res.json({
    code: 200,
    status: "success",
    data,
    page,
    totalPage,
  });
};

module.exports = getByCategory;
