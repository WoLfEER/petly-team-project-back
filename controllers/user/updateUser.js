const uploadImage = require("../../helpers/cloudinary");

const User = require("../../models/user");
const {HttpError} = require("../../helpers")

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { name, email, birthday, phone, city } = req.body;
  let avatar = null;

  if (!_id) {
    throw HttpError(404, "Not found");
  }

  if (req.file) {
    const file = req.file.buffer;
    const result1 = await uploadImage(file, "avatars");
    avatar = result1.secure_url;
  } else {
    avatar = _id.avatarURL;
  }

  const result = await User.findByIdAndUpdate(
    _id,
    {
      avatarURL: avatar,
      name,
      email,
      birthday,
      phone,
      city,
    },
    {
      new: true,
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateUser;
