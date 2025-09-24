//Import statements
import { employees, Employee } from "../../../data/employees";

//Function for getting all empolyees
export const getAllEmployees = (): Employee[] => employees;

//Function for getting employee by id 
export const getEmployeeById = (id: number): Employee | undefined =>
  employees.find((e) => e.id === id);

// Create employee function
export const createEmployee = (data: Omit<Employee, "id">): { message: string; id: number } => {
  const newId =
    employees.length > 0
      ? Math.max(...employees.map((e) => e.id)) + 1
      : 1;

  const newEmployee: Employee = { id: newId, ...data };
  employees.push(newEmployee);

  return { message: "Employee added successfully", id: newId };
};

// Update employee Function
export const updateEmployee = (
  id: number,
  updates: Partial<Omit<Employee, "id">>
): string => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return "Employee not found";

  employees[index] = { ...employees[index], ...updates };
  return "Employee updated";
};

// Delete employee Function
export const deleteEmployee = (id: number): string => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return "Employee not found";

  employees.splice(index, 1);
  return "Employee deleted";
};

//Get all employees for a branch
export const getEmployeesByBranch = (branchId: number): Employee[] => {
  return employees.filter((e) => e.branchId === branchId);
};

//Get all employees by department
export const getEmployeesByDepartment = (department: string): Employee[] => {
  return employees.filter(
    (e) => e.department.toLowerCase() === department.toLowerCase()
  );
};