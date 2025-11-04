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
/**
 * @openapi
 * /branch:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBranch'
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 */
router.post("/", validateRequest(schema.createbranchSchema), CreateBranch);

//Get all Branches
/**
 * @openapi
 * /branch:
 *   get:
 *     summary: Get all branches
 *     tags: [Branch]
 *     responses:
 *       '200':
 *         description: List of all branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/", getBranches);

// Get a specific branch with id
/**
 * @openapi
 * /branch/{id}:
 *   get:
 *     summary: Get branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       '404':
 *         description: Branch not found
 */
router.get("/:id", getaBranch);

//Update a branch
/**
 * @openapi
 * /branch/{id}:
 *   put:
 *     summary: Update an existing branch
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBranch'
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *       '400':
 *         description: Invalid input
 *       '404':
 *         description: Branch not found
 */
router.put("/:id", validateRequest(schema.updatebranchSchema, "body"), editBranch);

//Delete a branch
/**
 * @openapi
 * /branch/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branch]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Branch deleted successfully
 *       '404':
 *         description: Branch not found
 */
router.delete("/:id", DeleteBranch);

export default router;
