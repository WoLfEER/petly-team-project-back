const { User } = require("../../models/user");

const getOwnNoticeFavorites = async (req, res) => {
  const { _id } = req.user;
  const user = await User.find({ _id }, { favorites: 1, _id: 0 }).populate({
    path: "favorites",
    populate: {
      path: "owner",
      select: "email phone",
    },
  });
  const data = user[0].favorites;

  res.json({ code: 200, status: "success", data });
};

module.exports = getOwnNoticeFavorites;
