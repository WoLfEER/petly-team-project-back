const { Notice } = require("../../models/notice");
const { uploadImage } = require("../../helpers");
const fs = require("fs").promises;

const addNotice = async (req, res) => {
  const { _id: owner } = req.user;

  const avatarInfo = {
    avatarURL:
      "https://res.cloudinary.com/dhfk2xkow/image/upload/v1672264113/3700_6_10_ckne9o.jpg",
    cloudId: "avatars/pqys0k4rpbrlkrliywpw",
  };

  if (req.file) {
    const { path: tempDir } = req.file;

    const avatar = await uploadImage(tempDir);

    avatarInfo.avatarURL = avatar.secure_url;
    avatarInfo.cloudId = avatar.public_id;
    fs.unlink(tempDir);
  }

  let userNotice = await Notice.create({
    ...req.body,
    ...avatarInfo,
    owner,
  });

  userNotice = await userNotice.populate("owner", "email phone");

  res.json(userNotice);
};

module.exports = addNotice;
