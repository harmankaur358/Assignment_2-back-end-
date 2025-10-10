//Import Statements
import { NextFunction, Request, Response } from "express";
import {
  getAllBranches,
  getBranchById,
  createBranch,
  updateBranch,
  deleteBranch,
} from "../services/branchService";
import { successResponse, errorResponse } from "../models/responseModel";
 
// Get all branches
export const getBranches = async (_req: Request, res: Response, next:NextFunction) => {
  try{
  const branches =  await getAllBranches();
  res.status(200).json(successResponse(branches));
  }
  catch(error: unknown) {
    next(error);
  }
};
 
//Get a specific branch
export const getaBranch = async (req: Request, res: Response, next: NextFunction) => {
  try{
  const id = Number(req.params.id);
  if (isNaN(id)) {
  return res.status(400).json(errorResponse("Invalid branch ID"));}

  const branch =  await getBranchById(id);
 
  if (!branch) return res.status(404).json(errorResponse("Branch not found"));
 
  return res.status(200).json(successResponse(branch));
  }
  catch(error: unknown) {
    next(error);
  }

};
 
// Create a branch
export const CreateBranch = async (req: Request, res: Response,next:NextFunction) => {
  try{
  const { name, address, phone } = req.body;
  if (!name || !address || !phone) {
    return res.status(400).json(errorResponse("Missing required fields"));
  }
 
  const branch =  await createBranch({ name, address, phone });
  res.status(201).json(successResponse(branch));
  }
  catch(error: unknown) {
    next(error);
  }
};
 
//Updating an existing branch
export const editBranch = async(req: Request, res: Response,next: NextFunction) => {
  try{
  const id = Number(req.params.id);
  if (isNaN(id)) {
  return res.status(400).json(errorResponse("Invalid branch ID"));
  }

  const branch = await updateBranch(id, req.body);
 
  if (!branch) return res.status(404).json(errorResponse("Branch not found"));
 
  res.status(200).json(successResponse(branch));
  }
  catch(error: unknown) {
    next(error);
  }
};
 
//Delete a branch
export const DeleteBranch = async (req: Request, res: Response, next: NextFunction) => {
  try{
  const id = Number(req.params.id);
  if (isNaN(id)) {
  return res.status(400).json(errorResponse("Invalid branch ID"));
  }

  const success =  await deleteBranch(id);
 
  if (!success) return res.status(404).json(errorResponse("Branch not found"));
 
  res.status(200).json(successResponse(success));
  }
  catch(error: unknown) {
    next(error);
  }
};
 