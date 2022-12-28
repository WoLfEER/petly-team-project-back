const uploadImage = require("../../helpers/cloudinary");

const {User} = require("../../models/user");
const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { name, email, birthday, phone, city } = req.body;
  let avatar = null;

  if (!_id) {
    throw HttpError(404, "Not found");
  }

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  if (req.file) {
    const { path: tempDir } = req.file;
    const result1 = await uploadImage(tempDir);
    avatar = result1.secure_url;
  } else {
    avatar = _id.avatarUrl;
  }

  const result = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: avatar,
      name,
      email,
      birthday,
      phone,
      city,
    },
    {
      new: true,
      select: {
        password: false,
        myPets: false,
      },
    }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateUser;
