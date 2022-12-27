const { UserPet } = require("../../models/userPet");

const removeUserPet = async (req, res) => {
  const { petId } = req.params;
  const removeUserPet = await UserPet.findByIdAndRemove(petId);

  if (!removeUserPet) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "User pet deleted" });
};

module.exports = removeUserPet;
