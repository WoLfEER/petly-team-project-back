const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const getOwnNoticeFavorites = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const counter = await User.find({ _id }, { favorites: 1, _id: 0 }).count();

  let totalPage = 1;

  if (counter !== 0) {
    totalPage =
      counter % limit !== 0 ? Math.floor(counter / limit) + 1 : counter / limit;
  }

  if (page > totalPage) {
    next(HttpError(400, `Not Found, ${page} is last page`));
  }

  const user = await User.find(
    { _id },
    { favorites: 1, _id: 0 },
    {
      skip,
      limit: Number(limit),
    }
  ).populate({
    path: "favorites",
    populate: {
      path: "owner",
      select: "email phone",
    },
  });
  const data = user[0].favorites;

  res.json({ code: 200, status: "success", data, page, totalPage, counter });
};

module.exports = getOwnNoticeFavorites;
