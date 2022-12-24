const User = require("../../models/user");
const {HttpError} = require("../../helpers")

const getUserPets = async (req, res) => {
  
  const { _id: userId } = req.user;

  const currentUser = await User.findOne({ _id: userId }).populate("myPets");



  const result = currentUser.myPets;

  if (!result) {
    throw HttpError(404, "not found pets");
  }
  res.status(200).json(result);
};

module.exports = getUserPets;
