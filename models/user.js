const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const emailRegexp = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/;

const Joi = require("joi");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 7,
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
  password: Joi.string()
    .min(7)
    .max(32)
    .required()
    .pattern(/^[a-zA-Z0-9а-яА-Я]+$/),
  email: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]+[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/),
});

const registerSchema = Joi.object({
  password: Joi.string()
    .min(7)
    .max(32)
    .required()
    .pattern(/^[a-zA-Z0-9а-яА-Я]+$/),
  repeat_password: Joi.ref("password"),
  email: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]+[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9]+$/),
  name: Joi.string().required(),
  city: Joi.string(),
  phone: Joi.string(),
});

const refreshPassSchema = Joi.object({
  email: Joi.string().required(),
});

const schemas = {
  loginSchema,
  registerSchema,
  refreshSchema,
  refreshPassSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
