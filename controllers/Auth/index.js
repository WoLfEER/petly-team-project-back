const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const refresh = require("./refresh");

const googleAuth = require("./googleAuth");

module.exports = {
  register,
  login,
  logout,
  refresh,
  googleAuth,
};
