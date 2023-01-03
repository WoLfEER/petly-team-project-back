const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  const result = await Notice.findById(noticeId);

  if (result.like.includes(id)) {
    const userFavorite = await User.findByIdAndUpdate(id, {
      $pull: { favorites: noticeId },
    });
    await Notice.findByIdAndUpdate(noticeId, {
      $pull: { like: id },
    });
    res.json({ userFavorite });
    return;
  }

  // add
  const userFavorite = await User.findByIdAndUpdate(id, {
    $push: { favorites: noticeId },
  });
  await Notice.findByIdAndUpdate(noticeId, {
    $push: { like: id },
  });

  res.json({ userFavorite });
};

module.exports = updateFavorites;
