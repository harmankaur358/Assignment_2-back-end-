//Importing Joi
import Joi from "joi";

/* Branch Schema
name should be string (length from 2 to 50, required field)
address should be of string ( length min. 5, required)
phone number should be of given pattern (required field) */

export const branchSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string().pattern(/^[0-9\-() ]{10,20}$/).required(),
});
