//Import statements
import request from "supertest";
import app from "../src/app"; 
//import { employees } from "src/data/employees"; 

describe("Employee Routes", () => {
   // Create test 1
  describe("POST /api/v1/employee", () => {
    it("Created a new employee successfully", async () => {
      const newEmployee = {
        name: "Harman",
        position: "Developer",
        department: "IT",
        email: "harman@example.com",
        phone: "1234567890",
        branchId: 1
      };

      const res = await request(app).post("/api/v1/employee").send(newEmployee);
      expect(res.status).toBe(201);
      expect(res.body.message).toEqual("Employee added successfully");
      expect(res.body.id).toBeGreaterThan(0);
    });
    
    // create test 2
    it("Return 400 if parameters are missing", async () => {
      const incompleteEmployee = {
        name: "Jane Doe"
      };

      const res = await request(app).post("/api/v1/employee").send(incompleteEmployee);
      expect(res.status).toBe(400);
      expect(res.body.error).toBeDefined();
    });
  });

  // Get all employees
  describe("GET /api/v1/employee", () => {
    it("Got all employees successfully", async () => {
      const res = await request(app).get("/api/v1/employee");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // Get a employee by id
  describe("GET /api/v1/employee/:id", () => {
    it("Got an employee by ID successfully", async () => {
      const res = await request(app).get("/api/v1/employee/1");
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
    });
   
    //Get a employee by id(bad test)
    it("returned 400 for invalid ID", async () => {
      const res = await request(app).get("/api/v1/employee/abc");
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid employee ID");
    });
  });

  // Update test
  describe("PUT /api/v1/employee/:id", () => {
    it("updatea an employee successfully", async () => {
      const updateData = { position: "Senior Developer" };
      const res = await request(app).put("/api/v1/employee/1").send(updateData);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Employee updated");
    });

    // Update test 2(bad test)
    it("Returned 400 when id is invalid or not found", async () => {
      const res = await request(app).put("/api/v1/employee/abc").send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid employee ID");
    });
  });

  // Delete test
  describe("DELETE /api/v1/employee/:id", () => {
    it("Deleted an employee successfully", async () => {
      const res = await request(app).delete("/api/v1/employee/1");
      expect(res.status).toBe(200);
      expect(res.body.message).toBe("Employee deleted");
    });

    //Delete test 2(bad test)
    it("Returned 400 for invalid ID", async () => {
      const res = await request(app).delete("/api/v1/employee/xyz");
      expect(res.status).toBe(400);
      expect(res.body.error).toBe("Invalid employee ID");
    });
  });

});