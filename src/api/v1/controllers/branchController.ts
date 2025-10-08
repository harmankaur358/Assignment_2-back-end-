//Import Statements
import { Request, Response } from "express";
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../services/branchService";
 
// Get all branches
export const getBranches = (_req: Request, res: Response) => {
  res.json(getAllBranches());
};
 
//Get a specific branch
export const getaBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const branch = getBranchById(id);
 
  if (!branch) return res.status(404).json({ error: "Branch not found" });
 
  res.json(branch);
};
 
// Create a branch
export const CreateBranch = (req: Request, res: Response) => {
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json({ error: "Missing required fields" });
  }
 
  const branch = createBranch({ name, address, phone });
  res.status(201).json(branch);
};
 
//Updating an existing branch
export const editBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const branch = updateBranch(id, req.body);
 
  if (!branch) return res.status(404).json({ error: "Branch not found" });
 
  res.json(branch);
};
 
//Delete a branch
export const DeleteBranch = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const success = deleteBranch(id);
 
  if (!success) return res.status(404).json({ error: "Branch not found" });
 
  res.json({ message: "Branch deleted successfully" });
};
 