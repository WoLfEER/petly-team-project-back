const { User } = require("../../models/user");

const getOwnNoticeFavorites = async (req, res) => {
  const { _id: userId } = req.user;

  const {favorites} = await User.find({ _id: userId }).populate("favorites");
  res.json({ code: 200, status: "success", data: favorites });
};

module.exports = getOwnNoticeFavorites;
