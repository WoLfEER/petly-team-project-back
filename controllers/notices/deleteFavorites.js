const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");

const deleteFavorites = async (req, res, next) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  let user = await User.findByIdAndUpdate(id);
  const isAdded = user.favorites.includes(noticeId);

  if (!isAdded) {
    next(HttpError(409, "empty favorites"));
  }

  user = await User.findByIdAndUpdate(
    id,
    { $pull: { favorites: noticeId } },
    { new: true }
  );
  res.json({
    status: 200,
    message: "Your notice deleted",
    data: {
      noticeId,
    },
  });
};

module.exports = deleteFavorites;
