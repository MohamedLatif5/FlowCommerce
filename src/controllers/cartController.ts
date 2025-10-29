import { Response } from "express";
import { ExtendsRequest } from "../types/extendsRequest";
import { getCartUser, addItemToCart } from "../services/cartService";

/**
 * Get user's cart
 * GET /cart
 * @access Private (Requires JWT)
 */
export const getCart = async (
  req: ExtendsRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const cart = await getCartUser({ userId });
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error in getCart controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Add item to cart
 * POST /cart/items
 * @access Private (Requires JWT)
 */
export const addItem = async (
  req: ExtendsRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { productId, quantity } = req.body;

    // Validate required fields
    if (!productId) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    if (!quantity || typeof quantity !== "number" || quantity < 1) {
      res.status(400).json({
        message: "Valid quantity is required (must be a positive number)",
      });
      return;
    }

    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode || 200).json(response.data);
  } catch (error) {
    console.error("Error in addItem to cart controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
