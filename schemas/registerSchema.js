const Joi = require("joi");

// const cityRegex = /^(\w+(,)\s*)+\w+$/;
// const phoneRegex = /^+380\d{3}\d{2}\d{2}\d{2}$/;

const registerSchema = Joi.object({
  password: Joi.string().max(63).required(),
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  city: Joi.string()
    .required()
    .pattern(/[A-Z][a-z]*/),
  phone: Joi.string()
    .required()
    // .pattern(/^+380\d{3}\d{2}\d{2}\d{2}$/),
});

module.exports = registerSchema;