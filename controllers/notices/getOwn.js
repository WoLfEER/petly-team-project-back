const { Notice } = require("../../models/notice");

const getOwn = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Notice.find({ owner });
  

  return res.status(200).json(result);
};

module.exports = getOwn;
