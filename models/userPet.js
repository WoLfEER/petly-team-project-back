const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const Joi = require("joi").extend(require("@joi/date"));

const userPetSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  birthday: {
    type: String,
    default: null,
  },
  breed: {
    type: String,
    minlength: 2,
    maxlength: 16,
    required: true,
  },
  comments: {
    type: String,
    minlength: 8,
    maxlength: 120,
    default: null,
  },
  avatarURL: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  cloudId: {
    type: String,
  },
});

userPetSchema.post("save", handleSaveErrors);

const petSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(16)
    .required(),
  birthday: Joi.date(),
  breed: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(16)
    .required(),
  comments: Joi.string().min(8).max(120),
  avatarURL: Joi.string(),
});

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  birthday: Joi.date().format("DD.MM.YYYY").utc(),
  phone: Joi.string().pattern(/^\+380\d{9}$/, "numbers"),
  city: Joi.string().pattern(/[A-Z][a-z]*/),
});

const UserPet = model("userPet", userPetSchema);

const schemas = {
  petSchema,
  updateUserSchema,
};

module.exports = { schemas, UserPet };
