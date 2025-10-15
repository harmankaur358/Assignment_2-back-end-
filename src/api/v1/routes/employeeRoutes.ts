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
router.post("/", validateRequest(schema.createemployeeSchema), createEmployee);

//Get all employees
router.get("/", getAllEmployees);

// Get a specific employee with id
router.get("/:id", getEmployeeById);

//Update an employee 
router.put("/:id", validateRequest(schema.updateemployeeSchema, "body"),updateEmployee);

//Delete a employee
router.delete("/:id",deleteEmployee);

//Get all employees for branch
router.get("/branch/:branchId", getEmployeesByBranch )

//Get all employees by department
router.get("/department/:department",getEmployeesByDepartment)

export default router;



   