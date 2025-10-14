// Import statements
import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/services/employeeService", () => ({
  createEmployee: jest.fn(),
  getAllEmployees: jest.fn(),
  getEmployeeById: jest.fn(),
  updateEmployee: jest.fn(),
  deleteEmployee: jest.fn(),
  getEmployeesByBranch: jest.fn(),
  getEmployeesByDepartment: jest.fn(),
}));

import * as employeeService from "../src/api/v1/services/employeeService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Employee Routes (with mocked services)", () => {
  // GET all employees
  it("should return all employees", async () => {
    (employeeService.getAllEmployees as jest.Mock).mockResolvedValue([
      { id: 1, name: "Harman" },
      { id: 2, name: "Sukhveer" },
    ]);

    const res = await request(app).get("/api/v1/employee");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });

  it("should handle errors in getAllEmployees", async () => {
    (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(
      new Error("DB error")
    );

    const res = await request(app).get("/api/v1/employee");

    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Failed to get employees");
  });

  // GET employee by ID
  it("should return an employee by ID", async () => {
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Harman",
    });

    const res = await request(app).get("/api/v1/employee/1");

    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Harman");
  });

  it("should return 404 if employee not found", async () => {
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/v1/employee/999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });

  // POST create employee
  it("should create a new employee successfully", async () => {
    const newEmployee = {
      name: "Harman",
      position: "Developer",
      department: "IT",
      email: "harman@example.com",
      phone: "1234567890",
      branchId: 1,
    };

    (employeeService.createEmployee as jest.Mock).mockResolvedValue({
      id: "mockId123",
          });

    const res = await request(app).post("/api/v1/employee").send(newEmployee);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Success");
    expect(res.body.data.id).toBe("mockId123");
  });

  it("should return 400 when validation fails", async () => {
    const res = await request(app).post("/api/v1/employee").send({ name: "" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // PUT update employee
  it("should update an employee successfully", async () => {
    const updatedEmployee = { position: "Senior Developer" };

    (employeeService.updateEmployee as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Harman",
      position: "Senior Developer",
      message: "Employee updated",
    });

    const res = await request(app).put("/api/v1/employee/1").send(updatedEmployee);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success");
    expect(res.body.data.position).toBe("Senior Developer");
  });

  it("should return 404 if updating non-existing employee", async () => {
    (employeeService.updateEmployee as jest.Mock).mockResolvedValue("Employee not found");

    const res = await request(app).put("/api/v1/employee/999").send({ position: "Senior Developer" });

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });

  // DELETE employee
  it("should delete an employee successfully", async () => {
    (employeeService.deleteEmployee as jest.Mock).mockResolvedValue({
      message: "Employee deleted",
    });

    const res = await request(app).delete("/api/v1/employee/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Success");
  });

  it("should return 404 when deleting non-existing employee", async () => {
    (employeeService.deleteEmployee as jest.Mock).mockResolvedValue("Employee not found");

    const res = await request(app).delete("/api/v1/employee/999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });

  // GET employees by branch
  it("should return employees by branch", async () => {
    (employeeService.getEmployeesByBranch as jest.Mock).mockResolvedValue([
      { id: 1, name: "Harman", branchId: 1 },
      { id: 2, name: "Sukhveer", branchId: 1 },
    ]);

    const res = await request(app).get("/api/v1/employee/branch/1");

    expect(res.status).toBe(200);
    res.body.data.forEach((emp: any) => expect(emp.branchId).toBe(1));
  });

  it("should return 400 if branch ID is invalid", async () => {
    const res = await request(app).get("/api/v1/employee/branch/abc");
    expect(res.status).toBe(400);
  });

  // GET employees by department
  it("should return employees by department", async () => {
    (employeeService.getEmployeesByDepartment as jest.Mock).mockResolvedValue([
      { id: 1, name: "Harman", department: "IT" },
      { id: 2, name: "Sukhveer", department: "IT" },
    ]);

    const res = await request(app).get("/api/v1/employee/department/IT");

    expect(res.status).toBe(200);
    res.body.data.forEach((emp: any) => expect(emp.department).toBe("IT"));
  });

  it("should return 400 if department is missing", async () => {
    const res = await request(app).get("/api/v1/employee/department/");
    expect(res.status).toBe(400);
  });
});
