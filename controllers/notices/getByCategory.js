const { HttpError } = require("../../helpers");
const { Notice, categories } = require("../../models/notice");

const getByCategory = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 8, q } = req.query;
  const skip = (page - 1) * limit;

  if (!categories.includes(category)) {
    next(HttpError(400, `Not Found`));
  }

  let totalPage = 1;
  let counter = 1;

  const check = Boolean(q);

  if (!check) {
    counter = await Notice.find({ category }).count();
  } else {
    counter = await Notice.find({
      $and: [
        { category },
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

  if (page > totalPage) {
    next(HttpError(400, `Not Found, ${page} is last page`));
  }

  let data = [];

  if (check) {
    data = await Notice.find(
      {
        $and: [
          { category },
          {
            $or: [
              { title: { $regex: `${q}`, $options: "i" } },
              { location: { $regex: `${q}`, $options: "i" } },
            ],
          },
        ],
      },
      "",
      {
        skip,
        limit: Number(limit),
      }
    ).populate({
      path: "owner",
      select: "id phone email",
    });
  } else {
    data = await Notice.find({ category }, "", {
      skip,
      limit: Number(limit),
    }).populate({
      path: "owner",
      select: "id phone email",
    });
  }

  res.json({
    code: 200,
    status: "success",
    data,
    page,
    totalPage,
    counter,
  });
};

module.exports = getByCategory;
