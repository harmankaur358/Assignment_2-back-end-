//Import Statements
import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";

// Create a new employee
export const createEmployee = (req: Request, res: Response) => {
  const { name, position, department, email, phone, branchId } = req.body;

  if (!name || !position || !department || !email || !phone || !branchId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const {message, id} = employeeService.createEmployee({
    name,
    position,
    department,
    email,
    phone,
    branchId,
  });

  res.status(201).json({ message, id });
};

// Get all employees
export const getAllEmployees = (_: Request, res: Response) => {
  res.json(employeeService.getAllEmployees());
};

// Get employee by ID
export const getEmployeeById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const employee = employeeService.getEmployeeById(id);
  if (!employee) return res.status(404).json({ error: "Employee not found" });

  res.json(employee);
};

// Update employee
export const updateEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const result = employeeService.updateEmployee(id, req.body);
  if (result === "Employee not found") {
    return res.status(404).json({ error: result });
  }

  res.json({ message: result });
};

// Delete employee
export const deleteEmployee = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid employee ID" });
  }

  const result = employeeService.deleteEmployee(id);
  if (result === "Employee not found") {
    return res.status(404).json({ error: result });
  }

  res.json({ message: result });
};
// Get all employees for a branch
export const getEmployeesByBranch = (req: Request, res: Response) => {
  const branchId = Number(req.params.branchId);
  if (isNaN(branchId)) return res.status(400).json({ error: "Invalid branch ID" });

  const result = employees.filter(e => e.branchId === branchId);
  res.status(200).json(result);
};

// Get all employees by department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const { department } = req.params;
  if (!department) return res.status(400).json({ error: "Department is required" });

  const result = employees.filter(e => e.department.toLowerCase() === department.toLowerCase());
  res.status(200).json(result);
};