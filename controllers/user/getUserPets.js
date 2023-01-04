
const { User } = require("../../models/user");


const { HttpError } = require("../../helpers");

const getUserPets = async (req, res) => {
  console.log(req)
  const { _id: userId } = req.user;
  try {
    const currentUser = await User.findOne(
      {
        _id: userId,
      },
      { password: 0, token: 0 }
    ).populate("myPets");
      
    res.status(200).json(currentUser);
  } catch (error) {
    throw HttpError(404, error.message);
  }
};

module.exports = getUserPets;
