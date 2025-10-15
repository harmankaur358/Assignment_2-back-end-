import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { successResponse, errorResponse } from "../models/responseModel";

// Create a new employee
export const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, position, department, email, phone, branchId } = req.body;
    if (!name || !position || !department || !email || !phone || !branchId) {
      return res.status(400).json(
        errorResponse("Unable to create employee", "Missing required fields")
      );
    }

    const { message, id } = await employeeService.createEmployee({
      name,
      position,
      department,
      email,
      phone,
      branchId,
    });

    res.status(201).json(successResponse({ id }, message));
  } catch (error: unknown) {
    next(error);
  }
};

// Get all employees
export const getAllEmployees = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).json(successResponse(employees));
  } catch (error: unknown) {
    next(error);
  }
};

// Get employee by ID
export const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json(errorResponse("Invalid employee ID"));
    }

    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json(errorResponse("Employee not found"));
    }

    res.status(200).json(successResponse(employee));
  } catch (error: unknown) {
    next(error);
  }
};

// Update employee
export const updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json(errorResponse("Invalid employee ID"));
    }

    const updatedEmployee = await employeeService.updateEmployee(id, req.body);
    if (!updatedEmployee) {
      return res.status(404).json(errorResponse("Employee not found"));
    }

    res.status(200).json(successResponse(updatedEmployee, "Employee updated successfully"));
  } catch (error: unknown) {
    next(error);
  }
};

// Delete employee
export const deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json(errorResponse("Invalid employee ID"));
    }

    const result = await employeeService.deleteEmployee(id);
    if (!result) {
      return res.status(404).json(errorResponse("Employee not found"));
    }

    res.status(200).json(successResponse(null, result));
  } catch (error: unknown) {
    next(error);
  }
};

// Get employees by branch
export const getEmployeesByBranch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const branchId = Number(req.params.branchId);
    if (!branchId) {
      return res.status(400).json(errorResponse("Provide a valid branch ID"));
    }

    const employees = await employeeService.getEmployeesByBranch(branchId);
    res.status(200).json(successResponse(employees));
  } catch (error: unknown) {
    next(error);
  }
};

// Get employees by department
export const getEmployeesByDepartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const department = req.params.department;
    if (!department) {
      return res.status(400).json(errorResponse("Department is a required field"));
    }

    const employees = await employeeService.getEmployeesByDepartment(department);
    res.status(200).json(successResponse(employees));
  } catch (error: unknown) {
    next(error);
  }
};
