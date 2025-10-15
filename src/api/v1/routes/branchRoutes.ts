//Import statements
import { Router } from "express";
import {
  getBranches,
 getaBranch,
  CreateBranch,
  editBranch,
  DeleteBranch
} from "../controllers/branchController";
import * as schema from "../validation/branchValidaton"
import {validateRequest} from "../middleware/validation"

const router = Router();

//Create a new Branch
router.post("/",validateRequest(schema.createbranchSchema),CreateBranch);

//Get all Branches
router.get("/", getBranches);

// Get a specific branch with id
router.get("/:id",getaBranch);

//Update an branch 
router.put("/:id",validateRequest(schema.updatebranchSchema, "body"),editBranch);

//Delete a branch
router.delete("/:id",DeleteBranch);

export default router;
