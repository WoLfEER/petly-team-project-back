const { User } = require("../../models/user");
const { HttpError, createTokens } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res) => {
  const { email, password, name, city, phone } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, " Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);

  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarUrl,
    name,
    city,
    phone,
  });

  const { accessToken, refreshToken } = await createTokens(newUser._id);

  await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

  res.status(201).json({
    user: {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
    accessToken,
    refreshToken,
  });
};

module.exports = register;
