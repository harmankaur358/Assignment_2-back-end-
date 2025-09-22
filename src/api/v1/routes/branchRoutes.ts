//Import statements
import { Router } from "express";
import {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
} from "../controllers/branchController";

const router = Router();

//Create a new Branch
router.post("/", createBranch);

//Get all Branches
router.get("/", getAllBranches);

// Get a specific branch with id
router.get("/:id", getBranchById);

//Update an branch info
router.put("/:id", updateBranch);

//Delete a branch
router.delete("/:id", deleteBranch);

export default router;
