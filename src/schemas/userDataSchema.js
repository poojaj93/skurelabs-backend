import Joi from 'joi';

const userDataSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'First name cannot be empty.',
    'string.min': 'First name should have a minimum length of {#limit}.',
    'string.max': 'First name should have a maximum length of {#limit}.',
    'any.required': 'First name is required.'
  }),
  lastName: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Last name cannot be empty.',
    'string.min': 'Last name should have a minimum length of {#limit}.',
    'string.max': 'Last name should have a maximum length of {#limit}.',
    'any.required': 'Last name is required.'
  }),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email cannot be empty.',
    'string.email': 'Invalid email format.',
    'any.required': 'Email is required.'
  }),
phoneNumber: Joi.string().trim().pattern(/^\+?[1-9]\d{1,14}$/).required().messages({
  'string.empty': 'Phone number cannot be empty.',
  'string.pattern.base': 'Phone number must be in valid international format (e.g., +1234567890).',
  'any.required': 'Phone number is required.'
}),

  companyName: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Company name cannot be empty.',
    'string.min': 'Company name should have a minimum length of {#limit}.',
    'string.max': 'Company name should have a maximum length of {#limit}.',
    'any.required': 'Company name is required.'
  }),
  jobTitle: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Job title cannot be empty.',
    'string.min': 'Job title should have a minimum length of {#limit}.',
    'string.max': 'Job title should have a maximum length of {#limit}.',
    'any.required': 'Job title is required.'
  }),
  country: Joi.string().trim().min(2).max(50).required().messages({
    'string.empty': 'Country cannot be empty.',
    'string.min': 'Country should have a minimum length of {#limit}.',
    'string.max': 'Country should have a maximum length of {#limit}.',
    'any.required': 'Country is required.'
  }),
  updates: Joi.boolean().default(true).messages({
    'boolean.base': 'Updates must be a boolean value.',
    'any.required': 'Updates preference is required.'
  })
});

export default userDataSchema;