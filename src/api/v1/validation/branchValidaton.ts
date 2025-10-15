//Importing Joi
import Joi from "joi";

//Branch Schema

export const createbranchSchema = Joi.object({
  id: Joi.number().integer().optional(),
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
});

export const updatebranchSchema = Joi.object({
  id: Joi.number().integer().optional(),
  name: Joi.string().min(2).max(50),
  address: Joi.string().min(5),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/),
});

export const branchidSchema = Joi.object({
  id: Joi.string().required(),
});


