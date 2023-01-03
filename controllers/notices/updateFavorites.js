const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;
    // const { favorite } = req.body;
  //   const result = await Notice.findById(noticeId);

  const user = await User.findById(id);
  const isAdded = user.favorites.includes(noticeId);


  if (isAdded) {
    res.json(1111);
    return;
  }

  user.favorites.push(noticeId);
  res.json(user);
};

module.exports = updateFavorites;
