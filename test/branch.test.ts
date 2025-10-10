//Import statements
import request from "supertest";
import app from "../src/app";

describe("Branch Routes", () => {
  // New branch creation test
  it("should create a new branch", async () => {
    // Arrange
    const newBranch = { name: "Kildonan Branch", address: "124 Vermilion road", phone: "204-588-4571" };

    // Act
    const res = await request(app).post("/api/v1/branch").send(newBranch);

    // Assert
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe(newBranch.name);
  });

  // Returning a error when branch is created with missing params
  it("return 400 if required field is missing", async () => {
    // Arrange
    const notvalidBranch = { name: "Polo Park branch" };

    // Act
    const res = await request(app).post("/api/v1/branch").send(notvalidBranch);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // test for getting all branch 
  it("return all branches", async () => {
    // Arrange & Act
    const res = await request(app).get("/api/v1/branch");

    // Assert
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  //Test for getting a branch by id 
  it("return a branch by Id", async () => {
    // Arrange
    const branchId = 1;

    // Act
    const res = await request(app).get(`/api/v1/branch/${branchId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", branchId);
  });

  // Returning a error when non existing branch id is passed
  it("return 400 if branch Id does not exist", async () => {
    // Arrange
    const branchId = "ab";

    // Act
    const res = await request(app).get(`/api/v1/branch/${branchId}`);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // test for Updating a branch
  it("update branch details", async () => {
    // Arrange
    const branchId = 1;
    const newphone = { phone: "999-888-7777" };

    // Act
    const res = await request(app).put(`/api/v1/branch/${branchId}`).send(newphone);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.phone).toBe(newphone.phone);
  });

  // Returning a error if updating branch do not exist
  it("return 400 if branch do not exist", async () => {
    // Arrange
    const branchId = 936;
    const newphone = { phone: "2721" };

    // Act
    const res = await request(app).put(`/api/v1/branch/${branchId}`).send(newphone);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });

  // Test for deleting a branch
  it("delete a branch", async () => {
    // Arrange
    const branchId = 1;

    // Act
    const res = await request(app).delete(`/api/v1/branch/${branchId}`);

    // Assert
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Branch deleted successfully");
  });

  // Returning a error when non exisiting branch is deleted
  it("return 400 status code if deleting branch does not exist", async () => {
    // Arrange
    const branchId = "ahs";

    // Act
    const res = await request(app).delete(`/api/v1/branch/${branchId}`);

    // Assert
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Validation failed.Please try again");
  });
});

