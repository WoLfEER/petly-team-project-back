const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");

const { FRONTEND_URL } = process.env;

const genNewPw = v4().slice(0, 8);

const refreshPass = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Email not found");
  }

  const hashPassword = await bcrypt.hash(genNewPw, 10);
  await User.findByIdAndUpdate(user._id, {
    password: hashPassword,
  });

  const mail = {
    to: email,
    subject: "Password renewal",
    html: `<h1>Welcome to Petly!</h1><p>Your new password is <b>${genNewPw}</b></p>
    <a target="_blank" href="${FRONTEND_URL}login/">Click here to get back to a website</a>`,
  };

  await sendEmail(mail);

  res.json({ message: "Password was sent to Your email" });
};

module.exports = refreshPass;
