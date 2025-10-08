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
import { createemployeeSchema, employeeidSchema, updateemployeeSchema } from "../validation/employeeValidaton";

const router = Router();

//Create a new employee
router.post("/",validate(createemployeeSchema, "body"), createEmployee);

//Get all employees
router.get("/", getAllEmployees);

// Get a specific employee with id
router.get("/:id",validate(employeeidSchema, "params"), getEmployeeById);

//Update an employee 
router.put("/:id",validate(updateemployeeSchema, "body"), updateEmployee);

//Delete a employee
router.delete("/:id",validate(employeeidSchema, "params"), deleteEmployee);

//Get all employees for branch
router.get("/branch/:branchId", getEmployeesByBranch )

//Get all employees by department
router.get("/department/:department", getEmployeesByDepartment)

export default router;



   