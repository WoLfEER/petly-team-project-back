const { UserPet } = require("../../models/userPet");

const removeUserPet = async (req, res) => {
  const { noticeId } = req.params;
  const removeUserPet = await UserPet.findByIdAndRemove(noticeId);

  if (!removeUserPet) {
    res.status(404).json({ message: "Not found" });
  }


  res.status(200).json({ message: "User pet deleted" });
};

module.exports = removeUserPet;
