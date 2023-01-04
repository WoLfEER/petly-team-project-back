const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
const Joi = require("joi");

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
    myPets: [{ type: Schema.ObjectId, ref: "userPet" }],
    accessToken: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveErrors);

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const schemas = {
  refreshSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
