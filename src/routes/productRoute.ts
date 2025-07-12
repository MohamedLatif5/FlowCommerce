import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const router = express.Router();

/**
 *  GET /products
 *  Get all products
 *  access  Public
 */
router.get("/", async (req, res) => {
  const { data, statuscode } = await getAllProducts();
  res.status(statuscode).json(data);
});

//  GET /products/:id

router.get("/:id", async (req, res) => {
  const { data, statuscode } = await getProductById(req.params.id);
  res.status(statuscode).json(data);
});

/**
 *  POST /products
 *  Create a new product
 *  access  Private (should be restricted to admins)
 */
router.post("/", async (req, res) => {
  const { data, statuscode } = await createProduct(req.body);
  res.status(statuscode).json(data);
});

/**
 * PUT /products/:id
 * Update a product
 * access  Private (should be restricted to admins)
 */
router.put("/:id", async (req, res) => {
  const { data, statuscode } = await updateProduct(req.params.id, req.body);
  res.status(statuscode).json(data);
});

/**
 * DELETE /products/:id
 * Delete a product
 * access  Private (should be restricted to admins)
 */
router.delete("/:id", async (req, res) => {
  const { data, statuscode } = await deleteProduct(req.params.id);
  res.status(statuscode).json(data);
});

export default router;
