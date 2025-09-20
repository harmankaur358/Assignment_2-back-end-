import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

const router = Router();

//  Create employee
router.post("/", createEmployee);

// Get all employees
router.get("/", getAllEmployees);

//  Get employee by ID
router.get("/:id", getEmployeeById);

//  Update employee
router.put("/:id", updateEmployee);

//  Delete employee
router.delete("/:id", deleteEmployee);

export default router;



   