const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  let user = await User.findByIdAndUpdate(id);
  const isAdded = user.favorites.includes(noticeId);

  if (isAdded) {
    res
      .status(409)
      .json({ code: 409, status: `Notice ${noticeId} already in favorites` });
    return;
  }
  user = await User.findByIdAndUpdate(
    id,
    { $push: { favorites: noticeId } },
    { new: true }
  );
  res.json({
    code: 200,
    status: "success",
    message: "Notice added to favorite",
    data: {
      noticeId,
    },
  });
};

module.exports = updateFavorites;
