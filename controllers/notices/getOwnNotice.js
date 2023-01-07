const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getOwnNotice = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  

  const counter = await Notice.find({ owner }).count();
  let totalPage = 1;

  if (counter !== 0) {
    totalPage =
      counter % limit !== 0 ? Math.floor(counter / limit) + 1 : counter / limit;
  }

  if (page > totalPage) {
    next(HttpError(400, `Not Found, ${page} is last page`));
  }

  const data = await Notice.find({ owner }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email phone");

  res.json({ code: 200, status: "success", data, page, totalPage, counter });
};

module.exports = getOwnNotice;
