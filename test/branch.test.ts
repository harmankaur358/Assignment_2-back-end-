// Import statements
import request from "supertest";
import app from "../src/app";

jest.mock("../src/api/v1/services/branchService", () => ({
  createBranch: jest.fn(),
  getAllBranches: jest.fn(),
  getBranchById: jest.fn(),
  updateBranch: jest.fn(),
  deleteBranch: jest.fn(),
}));

import * as branchService from "../src/api/v1/services/branchService";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Branch Routes (with mocked services)", () => {
  // create branch
  it("should create a new branch successfully", async () => {
    const newBranch = { name: "Kildonan Branch", address: "124 Vermilion road", phone: "204-588-4571" };

    (branchService.createBranch as jest.Mock).mockResolvedValue({
      id: "mockBranch123",
      message: "Branch added successfully",
      ...newBranch,
    });

    const res = await request(app).post("/api/v1/branch").send(newBranch);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Branch added successfully");
    expect(res.body.data.name).toBe(newBranch.name);
  });

  it("should return 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/v1/branch").send({ name: "Polo Park branch" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Missing required fields");
  });

  // GET all branches
  it("should return all branches", async () => {
    (branchService.getAllBranches as jest.Mock).mockResolvedValue([
      { id: 1, name: "Branch A" },
      { id: 2, name: "Branch B" },
    ]);

    const res = await request(app).get("/api/v1/branch");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(2);
  });

  // GET branch by ID
  it("should return a branch by ID", async () => {
    (branchService.getBranchById as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Branch A",
    });

    const res = await request(app).get("/api/v1/branch/1");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id", 1);
  });

  it("should return 404 if branch not found", async () => {
    (branchService.getBranchById as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/api/v1/branch/999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Branch not found");
  });

  // PUT update branch
  it("should update a branch successfully", async () => {
    const updatedBranch = { phone: "999-888-7777" };

    (branchService.updateBranch as jest.Mock).mockResolvedValue({
      id: 1,
      name: "Branch A",
      phone: "999-888-7777",
      message: "Branch updated",
    });

    const res = await request(app).put("/api/v1/branch/1").send(updatedBranch);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Branch updated");
    expect(res.body.data.phone).toBe(updatedBranch.phone);
  });

  it("should return 400 if updating non-existing branch", async () => {
    (branchService.updateBranch as jest.Mock).mockResolvedValue(false);

    const res = await request(app).put("/api/v1/branch/999").send({ phone: "2721" });

    expect(res.status).toBe(404);

  });

  // DELETE branch
  it("should delete a branch successfully", async () => {
    (branchService.deleteBranch as jest.Mock).mockResolvedValue(true);

    const res = await request(app).delete("/api/v1/branch/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Branch deleted successfully");
  });

  it("should return 404 when deleting non-existing branch", async () => {
    (branchService.deleteBranch as jest.Mock).mockResolvedValue(false);

    const res = await request(app).delete("/api/v1/branch/999");

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Branch not found");
  });
});
