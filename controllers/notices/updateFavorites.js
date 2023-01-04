const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  let user = await User.findByIdAndUpdate(id);
  const isAdded = user.favorites.includes(noticeId);

  if (isAdded) {
    res
      .status(409)
      .json({ status: 409, message: "Notice already in favorites" });
    return;
  }
  user = await User.findByIdAndUpdate(
    id,
    { $push: { favorites: noticeId } },
    { new: true }
  );
  res.status(200).json({
    status: 200,
    message: "Notice added to favorite",
    data: {
      id: noticeId,
    },
  });
};

module.exports = updateFavorites;

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
