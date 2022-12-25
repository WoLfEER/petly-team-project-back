const News = require("../../models/news");

const getNews = async (req, res, next) => {
  const result = await News.find({});
  res.json(result);
};

module.exports = getNews;


