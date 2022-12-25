const Joi = require("joi").extend(require("@joi/date"));

const updateUserSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  birthday: Joi.date().format("DD.MM.YYYY").utc(),
  phone: Joi.string().pattern(/^\+380\d{9}$/, "numbers"),
  city: Joi.string().pattern(/[A-Z][a-z]*/),
});

module.exports = updateUserSchema;