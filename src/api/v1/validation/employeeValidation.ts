//Importing Joi
import Joi from "joi";

// Employee Schema 
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateEmployee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - phone
 *         - email
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           description: Optional employee ID
 *           example: "e001"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Full name of the employee
 *           example: "John Doe"
 *         position:
 *           type: string
 *           description: Job position of the employee
 *           example: "Manager"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 45
 *           description: Department name
 *           example: "Sales"
 *         phone:
 *           type: string
 *           pattern: "^\d{3}-\d{3}-\d{4}$"
 *           description: Contact phone number
 *           example: "123-456-7890"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee email address
 *           example: "john@example.com"
 *         branchId:
 *           type: number
 *           description: ID of the branch the employee belongs to
 *           example: 1
 */
export const createemployeeSchema = Joi.object({
  id: Joi.string().alphanum().optional(),
  name: Joi.string().min(2).max(50).required(),
  position: Joi.string().required(),
  department: Joi.string().min(2).max(45).required(),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
  email: Joi.string().email().required(),
  branchId: Joi.number().integer().required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateEmployee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Optional employee ID
 *           example: "e001"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Full name of the employee
 *           example: "John Doe"
 *         position:
 *           type: string
 *           description: Job position of the employee
 *           example: "Manager"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 45
 *           description: Department name
 *           example: "Sales"
 *         phone:
 *           type: string
 *           pattern: "^\d{3}-\d{3}-\d{4}$"
 *           description: Contact phone number
 *           example: "123-456-7890"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee email address
 *           example: "john@example.com"
 *         branchId:
 *           type: number
 *           description: ID of the branch the employee belongs to
 *           example: 1
 */
export const updateemployeeSchema = Joi.object({
  id: Joi.string().alphanum().optional(),
  name: Joi.string().min(2).max(50),
  position: Joi.string(),
  department: Joi.string().min(2).max(45),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/),
  email: Joi.string().email(),
  branchId: Joi.number().integer()
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - position
 *         - department
 *         - phone
 *         - email
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee
 *           example: "e001"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Full name of the employee
 *           example: "John Doe"
 *         position:
 *           type: string
 *           description: Job position of the employee
 *           example: "Manager"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 45
 *           description: Department name
 *           example: "Sales"
 *         phone:
 *           type: string
 *           pattern: "^\d{3}-\d{3}-\d{4}$"
 *           description: Contact phone number
 *           example: "123-456-7890"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee email address
 *           example: "john@example.com"
 *         branchId:
 *           type: number
 *           description: ID of the branch the employee belongs to
 *           example: 1
 */
export const employeeidSchema = Joi.object({
  id: Joi.string().required(),
});