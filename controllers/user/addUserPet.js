const uploadImage = require("../../helpers/cloudinary");

const { UserPet } = require("../../models/userPet");
const User = require("../../models/user");
const {HttpError} = require("../../helpers")

const addUserPet = async (req, res) => {
  const { id: owner } = req.user;

  let userPetImage = null;

  if (!owner) {
    throw HttpError(404, "Not found");
  }

  if (req.file) {
    const file = req.file.buffer;
    const result1 = await uploadImage(file, "pets");
    userPetImage = result1.secure_url;
  } else {
    userPetImage = owner.petURL;
  }

  const userNotice = await UserPet.create({
    ...req.body,
    petURL: userPetImage,
    owner,
  });

  const result = await User.findByIdAndUpdate(
    { _id: owner },
    { $push: { myPets: userNotice } },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(userNotice);
};

module.exports = addUserPet;
