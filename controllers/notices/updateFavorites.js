// const { HttpError } = require("../../helpers");
// const { User } = require("../../models/user");

// const updateFavorites = async (req, res) => {
//   const { id } = req.user;
//   const { id: noticeId } = req.params;

//   const user = await User.findById(id);
//   const isAdded = user.favorites.includes(noticeId);

//   if (isAdded) {
//     throw HttpError(409, "already in favs");
//   }

//   user.favorites.push(noticeId);
//   await user.save();
//   res.json(user);
// };

// module.exports = updateFavorites;

//

const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;
  // const { favorite } = req.body;
  //   const result = await Notice.findById(noticeId);

  let user = await User.findByIdAndUpdate(id);
  const isAdded = user.favorites.includes(noticeId);

  if (isAdded) {
    res.status(409).json({ message: "already in favs" });
    return;
  }
  user = await User.findByIdAndUpdate(
    id,
    { $push: { favorites: noticeId } },
    { new: true }
  );
  res.json(user);
};

module.exports = updateFavorites;
