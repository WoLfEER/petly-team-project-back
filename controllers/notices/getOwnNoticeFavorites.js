const { User } = require("../../models/user");

const getOwnNoticeFavorites = async (req, res) => {
  const { _id: userId } = req.user;
  const user = await User.findById(userId);
  res.json({ code: 200, status: "success", data: user })
};

module.exports = getOwnNoticeFavorites;
