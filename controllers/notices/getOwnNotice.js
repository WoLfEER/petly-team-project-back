const { HttpError } = require("../../helpers");
const { Notice } = require("../../models/notice");

const getOwnNotice = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 8, q } = req.query;
  const skip = (page - 1) * limit;

  const isUndefined = Boolean(q);

  let totalPage = 1;
  let counter = 1;

  if (!isUndefined) {
    counter = await Notice.find({ owner }).count();
  } else {
    counter = await Notice.find({
      $and: [
        { owner },
        {
          $or: [
            { title: { $regex: `${q}`, $options: "i" } },
            { location: { $regex: `${q}`, $options: "i" } },
          ],
        },
      ],
    }).count();
  }

  if (counter !== 0) {
    totalPage =
      counter % limit !== 0 ? Math.floor(counter / limit) + 1 : counter / limit;
  }
  let data = [];

  if (page > totalPage) {
    next(HttpError(400, `Not Found, ${page} is last page`));
  }

  if (isUndefined) {
    data = await Notice.find(
      {
        $and: [
          { owner },
          {
            $or: [
              { title: { $regex: `${q}`, $options: "i" } },
              { location: { $regex: `${q}`, $options: "i" } },
            ],
          },
        ],
      },
      "",
      { skip: Number(skip), limit: Number(limit) }
    ).populate("owner", "email phone");
  } else {
    data = await Notice.find({ owner }, "", {
      skip: Number(skip),
      limit: Number(limit),
    }).populate("owner", "email phone");
  }

  res.json({
    code: 200,
    status: "success",
    data,
    page: Number(page),
    totalPage,
    counter,
  });
};

module.exports = getOwnNotice;
