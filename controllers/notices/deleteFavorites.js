// const { HttpError } = require("../../helpers");
const { User } = require("../../models/user");

const deleteFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;
  // const { favorite } = req.body;
  //   const result = await Notice.findById(noticeId);

  let user = await User.findByIdAndUpdate(id);
  const isAdded = user.favorites.includes(noticeId);

  if (isAdded) {
    user = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: noticeId } },
      { new: true }
    );
    res.json(user);
  }
  res.status(409).json({ message: "empty favs" });
};

module.exports = deleteFavorites;
