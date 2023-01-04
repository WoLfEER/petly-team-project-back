const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY_REFRESH, SECRET_KEY_ACCESS } = process.env;

const createTokens = async (id) => {
  const payload = {
    id,
  };

  const accessToken = jwt.sign(payload, SECRET_KEY_ACCESS, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

module.exports = createTokens;
