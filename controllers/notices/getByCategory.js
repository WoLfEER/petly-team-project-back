const { HttpError } = require("../../helpers");
const { Notice, categories } = require("../../models/notice");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;

  if (!categories.includes(category)) {
    next(HttpError(400, `Not Found`));
  }

  const data = await Notice.find({ category }).populate({
    path: "owner",
    select: "id phone email",
  });
  res.json({ code: 200, status: "success", data });
};

module.exports = getByCategory;
