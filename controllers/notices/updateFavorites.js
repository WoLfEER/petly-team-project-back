const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  const result = await Notice.findById(noticeId);
  // console.log(result.info);

  // delete
  if (result.info.includes(id)) {
    const noticeFavoriteDelete = await Notice.findByIdAndUpdate(
      noticeId,
      { $pull: { info: id } },
      { new: true }
    );
    const userFavoriteDelete = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: noticeId } },
      { new: true }
    );

    res.json({ noticeFavoriteDelete, userFavoriteDelete });
    return;
  }

  // add
  const noticeFavorite = await Notice.findByIdAndUpdate(
    noticeId,
    { $push: { info: id } },
    { new: true }
  );
  const userFavorite = await User.findByIdAndUpdate(
    id,
    { $push: { favorites: noticeId } },
    { new: true }
  );

  res.json({ noticeFavorite, userFavorite });
};

module.exports = updateFavorites;
