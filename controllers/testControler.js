const Notice = require("../models/notice");

const testController = async (req, res, next) => {
  const result = await Notice.find({});

  res.json(result);
};

module.exports = testController;
