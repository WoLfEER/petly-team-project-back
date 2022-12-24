const Joi = require("joi").extend(require("@joi/date"));

const UserPetSchema = Joi.object({
  name: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(16),
  birthday: Joi.date(),
  breed: Joi.string()
    .regex(/^[a-zA-Z]+$/)
    .min(2)
    .max(16),
  comments: Joi.string().min(8).max(120),
  petURL: Joi.string(),
});

module.exports = UserPetSchema;
