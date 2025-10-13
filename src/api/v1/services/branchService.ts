// Import statements
import { Branch } from "../models/branchModel";
import * as firestoreRepository from "../repositories/firebaseRepository";

const COLLECTION = "branches";

// Get all branches
export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const all = await firestoreRepository.getDocuments(COLLECTION);
    return all.docs.map(doc => ({ id: Number(doc.id), ...(doc.data() as Omit<Branch, "id">) }));
  } catch {
    throw new Error("Unable to get branches");
  }
};

// Get branch by ID
export const getBranchById = async (id: number): Promise<Branch | null> => {
  try {
    const one_branch = await firestoreRepository.getDocumentById(COLLECTION, id.toString());
    return one_branch ? { id: Number(one_branch.id), ...(one_branch.data() as Omit<Branch, "id">) } : null;
  } catch {
    throw new Error(`Unable to get branch with id :${id}`);
  }
};

// Create a new branch
export const createBranch = async (data: Omit<Branch, "id">): Promise<{ message: string; id: number }> => {
  try {
    const create = await firestoreRepository.createDocument<Branch>(COLLECTION, data);
    return { message: "Branch added successfully", id: Number(create) };
  } catch {
    throw new Error("Unable to create branch");
  }
};

// Update a branch
export const updateBranch = async (id: number, updates: Partial<Branch>): Promise<string> => {
  try {
    await firestoreRepository.updateDocument<Branch>(COLLECTION, id.toString(), updates);
    return "Branch updated successfully";
  } catch {
    throw new Error(`Unable to update branch with id: ${id}`);
  }
};

// Delete a branch
export const deleteBranch = async (id: number): Promise<string> => {
  try {
    await firestoreRepository.deleteDocument(COLLECTION, id.toString());
    return "Branch deleted successfully";
  } catch {
    throw new Error(`Unable to delete branch with id: ${id}`);
  }
};