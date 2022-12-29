const { Notice } = require("../../models/notice");
const { User } = require("../../models/user");

const updateFavorites = async (req, res) => {
  const { id } = req.user;
  const { id: noticeId } = req.params;

  const result = await Notice.findById(noticeId);

  // add
  const userFavor = await User.findByIdAndUpdate(
    { $push: { favorites: noticeId } },
    { new: true }
  );

  // delete
  const userFavorDelete = await User.findByIdAndUpdate(
    id,
    { $pull: { favorites: noticeId } },
    { new: true }
  );

  res.json(result);
};

module.exports = updateFavorites;
