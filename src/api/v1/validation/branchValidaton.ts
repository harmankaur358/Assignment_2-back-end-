//Importing Joi
import Joi from "joi";

//Branch Schema
/**
 * @openapi
 * components:
 *   schemas:
 *     CreateBranch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: number
 *           description: Optional branch ID
 *           example: 1
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           description: Physical address of the branch
 *           example: "123 Main St, Toronto"
 *         phone:
 *           type: string
 *           pattern: "^\d{3}-\d{3}-\d{4}$"
 *           description: Contact phone number
 *           example: "123-456-7890"
 */
export const createbranchSchema = Joi.object({
  id: Joi.number().integer().optional(),
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).required(),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateBranch:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Optional branch ID
 *           example: 1
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           description: Physical address of the branch
 *           example: "123 Main St, Toronto"
 *         phone:
 *           type: string
 *           pattern: "^\d{3}-\d{3}-\d{4}$"
 *           description: Contact phone number
 *           example: "123-456-7890"
 */
export const updatebranchSchema = Joi.object({
  id: Joi.number().integer().optional(),
  name: Joi.string().min(2).max(50),
  address: Joi.string().min(5),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/),
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *           example: "b001"
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           description: Physical address of the branch
 *           example: "123 Main St, Toronto"
 *         phone:
 *           type: string
 *           pattern: "^\d{3}-\d{3}-\d{4}$"
 *           description: Contact phone number
 *           example: "123-456-7890"
 */
export const branchidSchema = Joi.object({
  id: Joi.string().required(),
});


