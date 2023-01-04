const createTokens = require("../../helpers/createTocens");

const { User } = require("../../models/user");

const { FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const { accessToken, refreshToken } = await createTokens(id);

  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  return res.redirect(
    `${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};

module.exports = googleAuth;
