const Friend = require("../../models/friends");

const getFriends = async (req, res, next) => {
 const  result = await Friend.find();
  res.json(result);
};

module.exports = getFriends;
