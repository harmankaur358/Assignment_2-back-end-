//Importing Joi
import Joi from "joi";

//Branch Schema

export const createbranchSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string().pattern(/^[0-9\-() ]{10,20}$/).required(),
});

export const updatebranchSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  address: Joi.string().min(5),
  phone: Joi.string().pattern(/^[0-9\-() ]{10,20}$/),
});

export const branchidSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});


