const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { query } = req.query;
  // const { page = 1, limit = 10 } = req.query;

  // const skip = (page - 1) * limit;
  if (!query) {
    const result = await Notice.find({ category }).populate({
      path: "owner",
      select: "id phone email",
    });
    if (result !== 0) {
      return res.status(200).json(result);
    }
    throw HttpError(404, "Not found");
  }
};

module.exports = getByCategory;
