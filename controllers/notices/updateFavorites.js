const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  const result = await Notice.findById(noticeId);
  // console.log(result.info);

  // delete

  if (result.like.includes(id)) {
    const userFavorite = await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: noticeId } },
      { new: true }
    );
    const noticeFavorite = await Notice.findByIdAndUpdate(
      noticeId,
      { $pull: { like: id } },
      { new: true }
    );
    res.json({ userFavorite, noticeFavorite });
    return;
  }

  // add
  const userFavorite = await User.findByIdAndUpdate(
    id,
    { $push: { favorites: noticeId } },
    { new: true }
  );
  const noticeFavorite = await Notice.findByIdAndUpdate(
    noticeId,
    { $push: { like: id } },
    { new: true }
  );

  res.json({ userFavorite, noticeFavorite });
};

module.exports = updateFavorites;
