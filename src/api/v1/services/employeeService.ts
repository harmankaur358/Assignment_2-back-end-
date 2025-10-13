//Import statements
import { Employee } from "../models/employeeModel";
import * as firestoreRepository from "../repositories/firebaseRepository";

const COLLECTION = "employees";

// Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const all_employess = await firestoreRepository.getDocuments(COLLECTION);
    return all_employess.docs.map(doc => ({
      id: Number(doc.id),
      ...(doc.data() as Omit<Employee, "id">),
    }));
  } catch {
    throw new Error("Unable to get all employees");
  }
};

// Get employee by ID
export const getEmployeeById = async (id: number): Promise<Employee | null> => {
  try {
    const one_employee = await firestoreRepository.getDocumentById(COLLECTION, id.toString());
    return one_employee ? { id: Number(one_employee.id), ...(one_employee.data() as Omit<Employee, "id">) } : null;
  } catch {
    throw new Error(`Unable to get employee with id: ${id}`);
  }
};

// Create employee
export const createEmployee = async (data: Omit<Employee, "id">): Promise<{ message: string; id: number }> => {
  try {
    const create = await firestoreRepository.createDocument<Employee>(COLLECTION, data);
    return { message: "Employee added successfully.", id: Number(create) };
  } catch {
    throw new Error("Unable to create employee.");
  }
};

// Update employee
export const updateEmployee = async (id: number, updates: Partial<Employee>): Promise<string> => {
  try {
    await firestoreRepository.updateDocument<Employee>(COLLECTION, id.toString(), updates);
    return "Employee updated";
  } catch {
    throw new Error(`Unable to update employee  with id: ${id}`);
  }
};

// Delete employee
export const deleteEmployee = async (id: number): Promise<string> => {
  try {
    await firestoreRepository.deleteDocument(COLLECTION, id.toString());
    return "Employee deleted";
  } catch {
    throw new Error(`Unable to delete employee with id: ${id}`);
  }
};

// Get employees by branch
export const getEmployeesByBranch = async (branchId: number): Promise<Employee[]> => {
  try {
    const by_branch = await firestoreRepository.getDocuments(COLLECTION);
    return by_branch.docs
      .map(doc => ({ id: Number(doc.id), ...(doc.data() as Omit<Employee, "id">) }))
      .filter(e => e.branchId === branchId);
  } catch {
    throw new Error("Unable to fetch employees for the given branch");
  }
};

// Get employees by department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  try {
    const by_department = await firestoreRepository.getDocuments(COLLECTION);
    return by_department.docs
      .map(doc => ({ id: Number(doc.id), ...(doc.data() as Omit<Employee, "id">) }))
      .filter(e => e.department.toLowerCase() === department.toLowerCase());
  } catch {
    throw new Error("Unable to get employees by the given department.");
  }
};
