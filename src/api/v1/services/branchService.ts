//Import statements
import {branches, Branch} from "../../../data/branches";

//Next id by adding 1 in length
let nextId = branches.length + 1;

//GetAllBranches 
export const getAllBranches = (): Branch[] => branches;

// Getting branch by id
export const getBranchById = (id: number): Branch | undefined =>
  branches.find((b) => b.id === id);

//Creating a new branch
export const createBranch = (data: Omit<Branch, "id">): Branch => {
  const newBranch: Branch = { id: nextId++, ...data };
  branches.push(newBranch);
  return newBranch;
};

//Updating an branch
export const updateBranch = (id: number, data: Partial<Omit<Branch, "id">>): Branch | undefined => {
  const branch = branches.find((b) => b.id === id);
  if (!branch) return undefined;

  Object.assign(branch, data);
  return branch;
};

//Function for deleting a branch
export const deleteBranch = (id: number): boolean => {
  const index = branches.findIndex((b) => b.id === id);
  if (index === -1) return false;

  branches.splice(index, 1);
  return true;
};
