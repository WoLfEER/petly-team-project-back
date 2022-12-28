const { UserPet } = require("../../models/userPet");

const { User } = require("../../models/user");
const { HttpError, uploadImage } = require("../../helpers");

const fs = require("fs").promises;

const addUserPet = async (req, res) => {
  const { _id: owner } = req.user;
  const defaultAvatar = 'https://res.cloudinary.com/dhfk2xkow/image/upload/v1672264113/3700_6_10_ckne9o.jpg'
  const avatarInfo = {
    avatarURL:
    defaultAvatar,
    cloudId: "avatars/pqys0k4rpbrlkrliywpw",
  };
  if (req.file) {
    const { path: tempDir } = req.file;

    const avatar = await uploadImage(tempDir);

    avatarInfo.avatarURL = avatar.secure_url;
    avatarInfo.cloudId = avatar.public_id;
    fs.unlink(tempDir);
  }

  if (!owner) {
    throw HttpError(404, "Not found");
  }

  const userNotice = await UserPet.create({
    ...req.body,
    ...avatarInfo,
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
