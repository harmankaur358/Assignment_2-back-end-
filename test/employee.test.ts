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
    //Arrange
    (employeeService.getAllEmployees as jest.Mock).mockResolvedValue([
      { id: 1, name: "Harman" },
      { id: 2, name: "Sukhveer" },
    ]);

    //Act
    const res = await request(app).get("/api/v1/employee");

    //Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });

  it("should handle errors in getAllEmployees", async () => {
    //Arrange
    (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(
      new Error()
    );

    //Act
    const res = await request(app).get("/api/v1/employee");

    //Assert
    expect(res.status).toBe(500);
  });

  // Get employee by ID
  it("should return an employee by ID", async () => {
    //Arrange
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Harman",
    });

    //Act
    const res = await request(app).get("/api/v1/employee/1");

    //Assert
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("Harman");
  });

  it("should return 404 if employee not found", async () => {
    //Arrange
    (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(null);

    //Act
    const res = await request(app).get("/api/v1/employee/999");

    //Assert
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });

  // create employee
  it("should create a new employee successfully", async () => {
    //Arrange
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

    //Act
    const res = await request(app).post("/api/v1/employee").send(newEmployee);

    //Assert
    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Success");
    expect(res.body.data.id).toBe("mockId123");
  });

  it("should return 400 when validation fails", async () => {
    //Arrange & Act
    const res = await request(app).post("/api/v1/employee").send({ name: "" });

    //Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Unable to create employee");
  });

  // update employee
  it("should update an employee successfully", async () => {
    //Arrange
    const updatedEmployee = { position: "Senior Developer" };

    (employeeService.updateEmployee as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Harman",
      position: "Senior Developer",
      message: "Employee updated",
    });

    //Act
    const res = await request(app).put("/api/v1/employee/1").send(updatedEmployee);

    //Assert
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee updated successfully");
    expect(res.body.data.position).toBe("Senior Developer");
  });

  it("should return 404 if updating non-existing employee", async () => {
    //Arrange
    (employeeService.updateEmployee as jest.Mock).mockResolvedValue(null);

    //Act
    const res = await request(app).put("/api/v1/employee/999").send({ position: "Senior Developer" });

    //Asssert
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Employee not found");
  });

  // DELETE employee
  it("should delete an employee successfully", async () => {
    //Arrange
    (employeeService.deleteEmployee as jest.Mock).mockResolvedValue({
      message: "Employee deleted",
    });

    //Act
    const res = await request(app).delete("/api/v1/employee/1");

    //Assert
    expect(res.status).toBe(200);
  });

  it("should return 404 when deleting non-existing employee", async () => {
    //Arrange
    (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(null);

    //Act
    const res = await request(app).delete("/api/v1/employee/999");

    //Assert
    expect(res.status).toBe(404);
  });

  // Get employees by branch
  it("should return employees by branch", async () => {
    //Arrange
    (employeeService.getEmployeesByBranch as jest.Mock).mockResolvedValue([
      { id: 1, name: "Harman", branchId: 1 },
      { id: 2, name: "Sukhveer", branchId: 1 },
    ]);

    //Act
    const res = await request(app).get("/api/v1/employee/branch/1");

    //Assert
    expect(res.status).toBe(200);
    res.body.data.forEach((emp: any) => expect(emp.branchId).toBe(1));
  });

  it("should return 400 if branch ID is invalid", async () => {
    //Arrange & Act
    const res = await request(app).get("/api/v1/employee/branch/abc");

    //Assert
    expect(res.status).toBe(400);
  });

  // Get employees by department
  it("should return employees by department", async () => {
    //Arrange
    (employeeService.getEmployeesByDepartment as jest.Mock).mockResolvedValue([
      { id: 1, name: "Harman", department: "IT" },
      { id: 2, name: "Sukhveer", department: "IT" },
    ]);

    //Act
    const res = await request(app).get("/api/v1/employee/department/IT");

    //Assert
    expect(res.status).toBe(200);
    res.body.data.forEach((emp: any) => expect(emp.department).toBe("IT"));
  });

  it("should return 400 if department is missing", async () => {
    //Arrange & Act
    const res = await request(app).get("/api/v1/employee/department/");
    
    //Assert
    expect(res.status).toBe(404);
  });
});
