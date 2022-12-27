const { Notice } = require("../../models/notice");
const User = require("../../models/user");
const { HttpError, uploadImage } = require("../../helpers");
const fs = require("fs").promises;

const addNotice = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const { path: tempDir } = req.file;

    const avatar = await uploadImage(tempDir);
    if (!owner) {
      throw HttpError(404, "Not found");
    }

    const userNotice = await Notice.create({
      ...req.body,
      avatarURL: avatar.secure_url,
      cloudId: avatar.public_id,
      owner,
    });

    await User.findByIdAndUpdate(
      owner,
      { $push: { notices: userNotice._id } },
      { new: true }
    );
    res.status(201).json(userNotice);
  } catch (error) {
    console.log(error);
  }
};

module.exports = addNotice;
