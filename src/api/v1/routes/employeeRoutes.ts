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
import { validate} from "../middleware/validation";
import { employeeSchema, employeeidSchema } from "../validation/employeeValidaton";

const router = Router();

//Create a new employee
router.post("/",validate(employeeSchema), createEmployee);

//Get all employees
router.get("/", getAllEmployees);

// Get a specific employee with id
router.get("/:id", getEmployeeById);

//Update an employee 
router.put("/:id",validate(employeeSchema), updateEmployee);

//Delete a employee
router.delete("/:id",validate(employeeidSchema), deleteEmployee);

//Get all employees for branch
router.get("/branch/:branchId", getEmployeesByBranch )

//Get all employees by department
router.get("/department/:department", getEmployeesByDepartment)

export default router;



   