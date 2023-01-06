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
    },
    phone: {
      type: String,
    },
    birthday: {
      type: String,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
    myPets: [{ type: Schema.ObjectId, ref: "userPet", default: [] }],
    favorites: [{ type: Schema.ObjectId, ref: "notice", default: [] }],
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

const loginSchema = Joi.object({
  password: Joi.string().min(1).max(32).required(),
  email: Joi.string().required(),
});

const registerSchema = Joi.object({
  password: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string(),
  // .pattern(/^(\w+(,)\s*)+\w+$/),
  phone: Joi.string(),
  // .pattern(/^\+380\d{9}$/, "numbers"),
});

const refreshPassSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  loginSchema,
  registerSchema,
  refreshSchema,
  refreshPassSchema
};

const User = model("user", userSchema);

module.exports = { User, schemas };
