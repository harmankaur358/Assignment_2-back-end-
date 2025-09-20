import { employees, Employee } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => employees;

// Get employee by ID
export const getEmployeeById = (id: number): Employee | undefined =>
  employees.find((e) => e.id === id);

// Create employee 
export const createEmployee = (data: Omit<Employee, "id">): string => {
  const newId =
    employees.length > 0
      ? Math.max(...employees.map((e) => e.id)) + 1
      : 1;

  const newEmployee: Employee = { id: newId, ...data };
  employees.push(newEmployee);

  return `Employee added with id ${newId}`;
};

// Update employee
export const updateEmployee = (
  id: number,
  updates: Partial<Omit<Employee, "id">>
): string => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return "Employee not found";

  employees[index] = { ...employees[index], ...updates };
  return "Employee updated";
};

// Delete employee
export const deleteEmployee = (id: number): string => {
  const index = employees.findIndex((e) => e.id === id);
  if (index === -1) return "Employee not found";

  employees.splice(index, 1);
  return "Employee deleted";
};