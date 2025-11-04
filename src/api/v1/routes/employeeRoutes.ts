//Import statements
import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByBranch,
  getEmployeesByDepartment
} from "../controllers/employeeController";
import * as schema from "../validation/employeeValidation"
import {validateRequest} from "../middleware/validation"

const router = Router();

//Create a new employee
/**
 * @openapi
 * /employee:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployee'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
router.post("/", validateRequest(schema.createemployeeSchema), createEmployee);

//Get all employees
/**
 * @openapi
 * /employee:
 *   get:
 *     summary: Get all employees
 *     tags: [Employee]
 *     responses:
 *       '200':
 *         description: List of all employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/", getAllEmployees);

// Get a specific employee with id
/**
 * @openapi
 * /employee/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Employee not found
 */
router.get("/:id", getEmployeeById);

//Update an employee 
/**
 * @openapi
 * /employee/{id}:
 *   put:
 *     summary: Update an existing employee
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEmployee'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Employee not found
 */
router.put("/:id", validateRequest(schema.updateemployeeSchema, "body"), updateEmployee);

//Delete an employee
/**
 * @openapi
 * /employee/{id}:
 *   delete:
 *     summary: Delete an employee
 *     tags: [Employee]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 */
router.delete("/:id", deleteEmployee);

//Get all employees for branch
/**
 * @openapi
 * /employee/branch/{branchId}:
 *   get:
 *     summary: Get all employees for a specific branch
 *     tags: [Employee]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of employees in the branch
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/branch/:branchId", getEmployeesByBranch );

//Get all employees by department
/**
 * @openapi
 * /employee/department/{department}:
 *   get:
 *     summary: Get all employees by department
 *     tags: [Employee]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: List of employees in the department
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/department/:department", getEmployeesByDepartment );

export default router;




   