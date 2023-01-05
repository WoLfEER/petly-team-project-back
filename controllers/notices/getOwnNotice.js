const { Notice } = require("../../models/notice");

const getOwnNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Notice.find({ owner }).populate("owner", "email phone");

  res.json({ code: 200, status: "success", data });
};

module.exports = getOwnNotice;
