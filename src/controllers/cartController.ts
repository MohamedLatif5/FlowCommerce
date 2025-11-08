import { Response } from "express";
import { ExtendsRequest } from "../types/extendsRequest";
import {
  getCartUser,
  addItemToCart,
  updateItemInCart,
  deleteItemFromCart,
} from "../services/cartService";

/**
 * Get user's cart
 * GET /cart
 * Private (Requires JWT)
 */
export const getCart = async (
  req: ExtendsRequest,
  res: Response
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
 * Private (Requires JWT)
 */
export const addItem = async (
  req: ExtendsRequest,
  res: Response
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

/**
 * Update item in cart
 * PUT /cart/items/:itemId
 * Private (Requires JWT)
 */
export const updateItem = async (
  req: ExtendsRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { itemId: productId } = req.params;
    const { quantity } = req.body;

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

    const response = await updateItemInCart({ userId, productId, quantity });
    res.status(response.statusCode || 200).json(response.data);
  } catch (error) {
    console.error("Error in updateItem in cart controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete item from cart
 * DELETE /cart/items/:itemId
 * Private (Requires JWT)
 */
export const deleteItem = async (
  req: ExtendsRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req?.user?._id;

    if (!userId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const { itemId: productId } = req.params;

    // Validate required fields
    if (!productId) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const response = await deleteItemFromCart({ userId, productId });
    res.status(response.statusCode || 200).json(response.data);
  } catch (error) {
    console.error("Error in deleteItem from cart controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
