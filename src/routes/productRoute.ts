import express from "express";
import {
  getAll,
  getById,
  create,
  update,
  remove,
} from "../controllers/productController";

const router = express.Router();

/**
 * GET /products
 * Get all products
 * @access Public
 */
router.get("/", getAll);

/**
 * GET /products/:id
 * Get a single product by ID
 * @access Public
 */
router.get("/:id", getById);

/**
 * POST /products
 * Create a new product
 * @access Private (should be restricted to admins)
 */
router.post("/", create);

/**
 * PUT /products/:id
 * Update a product
 * @access Private (should be restricted to admins)
 */
router.put("/:id", update);

/**
 * DELETE /products/:id
 * Delete a product
 * @access Private (should be restricted to admins)
 */
router.delete("/:id", remove);

export default router;
