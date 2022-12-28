const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 1,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp,
    },
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
      // required: true,
      unique: true,
    },
    birthday: {
      type: String,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    pets: [{ type: Schema.ObjectId, ref: "pets" }],
    notices: [{ type: Schema.ObjectId, ref: "notices" }],
    favorites: [{ type: Schema.ObjectId, ref: "favorites" }],
    own: [{ type: Schema.ObjectId, ref: "own" }],
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const User = model("user", userSchema);

module.exports = User;
