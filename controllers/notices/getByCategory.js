const { HttpError } = require("../../helpers");
const { Notice, categories } = require("../../models/notice");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 8, query } = req.query;
  // const skip = (page - 1) * limit;

  if (!categories.includes(category)) {
    next(HttpError(400, `Not Found`));
  }

  // const result = await Notice.find({ category }).or([
  //   { title: { $regex: `${query}`, $options: "i" } },
  //   { breed: { $regex: `${query}`, $options: "i" } },
  // ]);
  // const counter = await Notice.find({ category }).count();
  // let totalPage = 1;

  // if (counter !== 0) {
  //   totalPage =
  //     counter % limit !== 0 ? Math.floor(counter / limit) + 1 : counter / limit;
  // }

  // if (page > totalPage) {
  //   next(HttpError(400, `Not Found, ${page} is last page`));
  // }

  // const data = await Notice.find({ category }, "", {
  //   skip,
  //   limit: Number(limit),
  // }).populate({
  //   path: "owner",
  //   select: "id phone email",
  // });

  res.json({
    code: 200,
    status: "success",
    result,
    // data,
    // page,
    // totalPage,
    // counter,
  });
};

module.exports = getByCategory;
