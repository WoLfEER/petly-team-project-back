const { User } = require("../../models/user");

const getOwnNoticeFavorites = async (req, res) => {
  const { _id: userId } = req.user;

  const result = await User.findById(userId).populate("favorites");
  res.json({ code: 200, status: "success", data: result });
};

module.exports = getOwnNoticeFavorites;
