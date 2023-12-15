const Joi = require("joi");

const medicineValidationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[A-Za-z0-9\s]*$/)
    .max(40)
    .required()
    .messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name is required.",
      "string.max": "Name should not exceed 40 Characters",
    }),
  description: Joi.string().max(500).trim().required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
    "string.max": "Description should not exceed 500 characters.",
  }),

  activeIngredients: Joi.array().items(Joi.string().max(30).trim()).required().messages({
    "array.empty": "Active Ingredients is required.",
    "any.required": "Active Ingredients is required.",
    "string.max": "Each Active Ingredient should not exceed 50 characters.",
  }),

  price: Joi.number().required().messages({
    "number.base": "Price must be a number.",
    "any.required": "Price is required.",
  }),

  quantity: Joi.number().required().messages({
    "number.base": "Quantity must be a number.",
    "any.required": "Quantity is required.",
  }),

  medicinalUse: Joi.string()
    .max(30)
    .trim()
    .pattern(/^[A-Za-z\s-]+$/)
    .required()
    .messages({
      "string.base": "Medicinal Use must be a string.",
      "string.empty": "Medicinal Use is required.",
      "string.max": "Medicinal Use should not exceed 30 characters.",
      "string.pattern.base": "Medicinal Use should only contain letters, spaces and dashes.",
    }),
});

module.exports = medicineValidationSchema;
