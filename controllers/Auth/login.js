const { User } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

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

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
  await User.findByIdAndUpdate(user._id, { token });
  user = await User.findById(user._id).populate("myPets", { owner: 0 });

  res.json({
    user,
  });
};

module.exports = login;
