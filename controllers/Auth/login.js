const { User } = require("../../models/user");
const { HttpError, createTokens } = require("../../helpers");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, " Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, " Email or password invalid");
  }

  const { accessToken, refreshToken } = await createTokens(user._id);

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  user = await User.findById(user._id, {
    accessToken: 1,
    refreshToken: 1,
    email: 1,
    phone: 1,
    _id: 1,
  });

  res.json({
    user,
  });
};

module.exports = login;
