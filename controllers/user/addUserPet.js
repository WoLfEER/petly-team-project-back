const { UserPet } = require("../../models/userPet");
const User = require("../../models/user");
const { HttpError, uploadImage } = require("../../helpers");
const fs = require("fs").promises;

const addUserPet = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: tempDir } = req.file;

  const avatar = await uploadImage(tempDir);

  if (!owner) {
    throw HttpError(404, "Not found");
  }

  const userNotice = await UserPet.create({
    ...req.body,
    avatarURL: avatar.secure_url,
    cloudId: avatar.public_id,
    owner,
  });

  const result = await User.findByIdAndUpdate(
    { _id: owner },
    { $push: { myPets: userNotice } },
    {
      new: true,
    }
  );

  fs.unlink(tempDir);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(userNotice);
};

module.exports = addUserPet;