const { Notice } = require("../../models/notice");

const getFavorite = async (req, res) => {
  const { _id: userId } = req.user;
  const result = await Notice.find({ owner: userId._id });

  res.status(200).json(result);
};

module.exports = getFavorite;
