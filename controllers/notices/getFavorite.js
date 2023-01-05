const { User } = require("../../models/user");

const getFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  console.log(req.user);
  const result = await User.find({ favorites: userId._id });

  res.status(200).json(result);
};

module.exports = getFavorite;
