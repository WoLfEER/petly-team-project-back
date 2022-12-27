const Joi = require("joi").extend(require("@joi/date"));

const UserPetSchema = Joi.object({
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

module.exports = UserPetSchema;
