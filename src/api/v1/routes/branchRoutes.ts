//Import statements
import { Router } from "express";
import {
  getBranches,
 getaBranch,
  CreateBranch,
  editBranch,
  DeleteBranch
} from "../controllers/branchController";

const router = Router();

//Create a new Branch
router.post("/", CreateBranch);

//Get all Branches
router.get("/", getBranches);

// Get a specific branch with id
router.get("/:id", getaBranch);

//Update an branch 
router.put("/:id", editBranch);

//Delete a branch
router.delete("/:id", DeleteBranch);

export default router;
