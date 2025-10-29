import express from "express";
import { getCart, addItem } from "../controllers/cartController";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

/**
 * GET /cart
 * Get user's cart
 * @access Private (Requires JWT)
 */
router.get("/", validateJWT, getCart);

/**
 * POST /cart/items
 * Add item to cart
 * @access Private (Requires JWT)
 */
router.post("/items", validateJWT, addItem);

export default router;
