// Import statements
import request from "supertest";
import app from "../src/app";

describe("Employee Routes", () => {
  // Creating a new employee
  it("create a new employee successfully", async () => {
    // Arrange
    const newEmployee = {
      name: "Harman",
      position: "Developer",
      department: "IT",
      email: "harman@example.com",
      phone: "1234567890",
      branchId: 1,
    };

    // Act
    const res = await request(app).post("/api/v1/employee").send(newEmployee);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual("Employee added successfully");
    expect(res.body.data.id).toBeGreaterThan(0);
  });

  // Returning a error when employee with missing field is created
  it("return 400 if any required fields are missing", async () => {
    // Arrange
    const badEmployee = { name: "Sukhveer" };

    // Act
    const res = await request(app).post("/api/v1/employee").send(badEmployee);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // Test for Getting all employees
  it("return all employees successfully", async () => {
    // Arrange & Act
    const res = await request(app).get("/api/v1/employee");

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // Test for Getting a employee by id 
  it("return an employee by ID successfully", async () => {
    // Arrange
    const employeeId = 1;

    // Act
    const res = await request(app).get(`/api/v1/employee/${employeeId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.data.id).toBe(employeeId);
  });

  // Returning error when non existing id is passed
  it("return 400 for non-existing ID", async () => {
    // Arrange
    const nonexistingid = "abcf";

    // Act
    const res = await request(app).get(`/api/v1/employee/${nonexistingid}`);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // Updating a employee that exist
  it("update an employee successfully", async () => {
    // Arrange
    const employeeId = 1;
    const newdata = { position: "Senior Developer" };

    // Act
    const res = await request(app).put(`/api/v1/employee/${employeeId}`).send(newdata);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee updated");
  });

  // Returning a error if non existing employee is updated
  it("return 400 when ID is invalid", async () => {
    // Arrange
    const invalidId = "abcdaw";

    // Act
    const res = await request(app).put(`/api/v1/employee/${invalidId}`).send({ invalidId });

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // test for Deleting a employee
  it("delete an employee successfully", async () => {
    // Arrange
    const employeeId = 1;

    // Act
    const res = await request(app).delete(`/api/v1/employee/${employeeId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Employee deleted");
  });

  // Returning a error if non existing employee is deleted
  it("return 400 for invalid ID", async () => {
    // Arrange
    const invalidId = "x6tz";

    // Act
    const res = await request(app).delete(`/api/v1/employee/${invalidId}`);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });
  
  // return all employees for provided valid id
  it("return all employees for a valid branch ID", async () => {
    // Arrange
    const branchId = 1;

    // Act
    const res = await request(app).get(`/api/v1/employee/branch/${branchId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((emp: any) => expect(emp.branchId).toBe(branchId));
  });
  
  //return an error if provided id is missing
  it("return 400 if branch ID is missing", async () => {
    // Arrange & Act
    const res = await request(app).get(`/api/v1/employee/branch/`);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // return all employees of provided department
  it("return all employees for a valid department", async () => {
    // Arrange
    const department = "IT";

    // Act
    const res = await request(app).get(`/api/v1/employee/department/${department}`);

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    res.body.data.forEach((emp: any) => expect(emp.department.toLowerCase()).toBe(department.toLowerCase()));
  });

  // return error when department is missing
  it("return 400 if department parameter is missing", async () => {
    // Arrange & Act
    const res = await request(app).get(`/api/v1/employee/department/`);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

});
