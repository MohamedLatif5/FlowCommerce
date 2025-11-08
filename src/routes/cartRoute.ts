import express from "express";
import {
  getCart,
  addItem,
  updateItem,
  deleteItem,
} from "../controllers/cartController";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

/**
 * GET /cart
 * Get user's cart
 * Private (Requires JWT)
 */
router.get("/", validateJWT, getCart);

/**
 * POST /cart/items
 * Add item to cart
 * Private (Requires JWT)
 */
router.post("/items", validateJWT, addItem);

/**
 * PUT /cart/items/:itemId
 * Update item in cart
 * Private (Requires JWT)
 */
router.put("/items/:itemId", validateJWT, updateItem);

/**
 * DELETE /cart/items/:itemId
 * Delete item from cart
 * Private (Requires JWT)
 */
router.delete("/items/:itemId", validateJWT, deleteItem);

export default router;
