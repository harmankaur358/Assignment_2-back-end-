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
import { branchSchema, branchidSchema } from "../validation/branchValidaton";

const router = Router();

//Create a new Branch
router.post("/",validate(branchSchema), CreateBranch);

//Get all Branches
router.get("/", getBranches);

// Get a specific branch with id
router.get("/:id", getaBranch);

//Update an branch 
router.put("/:id",validate(branchSchema), editBranch);

//Delete a branch
router.delete("/:id", validate(branchidSchema), DeleteBranch);

export default router;
