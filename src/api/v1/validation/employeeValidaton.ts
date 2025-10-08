//Importing Joi
import Joi from "joi";

// Employee Schema 

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  position: Joi.string().required(),
  department: Joi.string().min(2).max(45).required(),
  phone: Joi.string().pattern(/^[0-9\-() ]{10,20}$/).required(),
  email: Joi.string().email().required(),
  branchId: Joi.number().integer().required(),
});

export const employeeidSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});