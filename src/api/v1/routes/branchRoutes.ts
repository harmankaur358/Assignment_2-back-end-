//Import statements
import { Router } from "express";
import {
  getBranches,
 getaBranch,
  CreateBranch,
  editBranch,
  DeleteBranch
} from "../controllers/branchController";
import { validate} from "../middleware/validation";
import { createbranchSchema, branchidSchema, updatebranchSchema } from "../validation/branchValidaton";

const router = Router();

//Create a new Branch
router.post("/",validate( createbranchSchema, "body"), CreateBranch);

//Get all Branches
router.get("/", getBranches);

// Get a specific branch with id
router.get("/:id", validate(branchidSchema, "params"),getaBranch);

//Update an branch 
router.put("/:id",validate(updatebranchSchema, "body"), editBranch);

//Delete a branch
router.delete("/:id", validate(branchidSchema, "params"), DeleteBranch);

export default router;
