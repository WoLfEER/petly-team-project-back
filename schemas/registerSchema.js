const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().max(32).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string()
    // .required()
    .pattern(/[A-Z][a-z]*/),
  phone: Joi.string()
    // .required()
    .pattern(/^\+380\d{9}$/, "numbers"),
});

module.exports = registerSchema;