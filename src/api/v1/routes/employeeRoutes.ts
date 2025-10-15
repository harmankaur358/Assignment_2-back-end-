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


const router = Router();

//Create a new employee
router.post("/", createEmployee);

//Get all employees
router.get("/", getAllEmployees);

// Get a specific employee with id
router.get("/:id", getEmployeeById);

//Update an employee 
router.put("/:id", updateEmployee);

//Delete a employee
router.delete("/:id",deleteEmployee);

//Get all employees for branch
router.get("/branch/:branchId", getEmployeesByBranch )

//Get all employees by department
router.get("/department/:department",getEmployeesByDepartment)

export default router;



   