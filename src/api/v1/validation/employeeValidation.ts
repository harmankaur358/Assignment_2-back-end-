//Importing Joi
import Joi from "joi";

// Employee Schema 

export const createemployeeSchema = Joi.object({
  id: Joi.string().alphanum().optional(),
  name: Joi.string().min(2).max(50).required(),
  position: Joi.string().required(),
  department: Joi.string().min(2).max(45).required(),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
  email: Joi.string().email().required(),
  branchId: Joi.number().integer().required(),
});

export const updateemployeeSchema = Joi.object({
  id: Joi.string().alphanum().optional(),
  name: Joi.string().min(2).max(50),
  position: Joi.string(),
  department: Joi.string().min(2).max(45),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/),
  email: Joi.string().email(),
  branchId: Joi.number().integer()
});

export const employeeidSchema = Joi.object({
  id: Joi.string().required(),
});