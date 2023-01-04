const { User } = require("../../models/user");

const deleteFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  let user = await User.findByIdAndUpdate(id);
  const isAdded = user.favorites.includes(noticeId);

  if (isAdded) {
    user = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: noticeId } },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      message: "Your notice deleted",
      data: {
        id: noticeId,
      },
    });
  }
  res.status(409).json({ status: 409, message: "empty favorites" });
};

module.exports = deleteFavorites;
