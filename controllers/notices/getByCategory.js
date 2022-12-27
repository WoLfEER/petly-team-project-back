const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { query } = req.query;
  const { page = 1, limit = 10 } = req.query;

  const skip = (page - 1) * limit;
  if (!query) {
    const result = await Notice.find({ category }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).sort({ createdAt: "desc" });
    if (result !== 0) {
      return res.status(200).json(result);
    }
    throw HttpError(404, "Not found");
  }

  const result = await Notice.find(
    { category, title: { $regex: `${query}`, $options: "i" } },
    "-createdAt -updatedAt",
    { skip, limit }
  ).sort({
    createdAt: "desc",
  });
  if (result.length !== 0) {
    return res.status(200).json(result);
  }
  throw HttpError(404, "Not found");
};
module.exports = getByCategory;
