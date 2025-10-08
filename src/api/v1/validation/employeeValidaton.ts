//Importing Joi
import Joi from "joi";

/* Employee Schema
name should be string (length from 2 to 50, required field)
position should be string(required field)
email should be of valid email format(required)
branch Id should integer(required) */

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  position: Joi.string().required(),
  email: Joi.string().email().required(),
  branchId: Joi.number().integer().required(),
});
