import { Employee } from "../models/employeeModel";
import * as firestoreRepository from "../repositories/firebaseRepository";

const COLLECTION = "employees";

// Get all employees
export const getAllEmployees = async (): Promise<Employee[]> => {
  const snapshot = await firestoreRepository.getDocuments(COLLECTION);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Employee, "id">),
  }));
};

// Get employee by ID
export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const doc = await firestoreRepository.getDocumentById(COLLECTION, id);
  return doc ? { id: doc.id, ...(doc.data() as Omit<Employee, "id">) } : null;
};

// Create employee (supports optional custom ID)
export const createEmployee = async (
  data: Omit<Employee, "id"> & { id?: string }
): Promise<{ message: string; id: string }> => {
  const id = await firestoreRepository.createDocument<Employee>(COLLECTION, data, data.id);
  return { message: "Employee added successfully", id };
};

// Update employee
export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee | null> => {
  const doc = await firestoreRepository.getDocumentById(COLLECTION, id);
  if (!doc) return null;

  await firestoreRepository.updateDocument<Employee>(COLLECTION, id, updates);
  return { id, ...(doc.data() as Omit<Employee, "id">), ...updates };
};

// Delete employee
export const deleteEmployee = async (id: string): Promise<string | null> => {
  const doc = await firestoreRepository.getDocumentById(COLLECTION, id);
  if (!doc) return null;

  await firestoreRepository.deleteDocument(COLLECTION, id);
  return "Employee deleted successfully";
};

// Get employees by branch
export const getEmployeesByBranch = async (branchId: number): Promise<Employee[]> => {
  const snapshot = await firestoreRepository.getDocuments(COLLECTION);
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Employee, "id">) }))
    .filter(emp => emp.branchId === branchId);
};

// Get employees by department
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  const snapshot = await firestoreRepository.getDocuments(COLLECTION);
  return snapshot.docs
    .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Employee, "id">) }))
    .filter(emp => emp.department.toLowerCase() === department.toLowerCase());
};
