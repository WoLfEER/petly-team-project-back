const { Strategy } = require("passport-google-oauth2");

const passport = require("passport");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BASE_URL } = process.env;

const { User } = require("../models/user");

const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/auth/google-redirect`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName, picture } = profile;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    }
    const password = await bcrypt.hash(v4(), 10);

    const newUser = await User.create({
      email,
      password,
      phone: "",
      name: displayName,
      avatarUrl: picture,
    });

    done(null, newUser);
  } catch (error) {
    done(error, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);

module.exports = passport;
