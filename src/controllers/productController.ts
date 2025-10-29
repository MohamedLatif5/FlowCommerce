import { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

/**
 * Get all products
 * GET /products
 * @access Public
 */
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, statuscode } = await getAllProducts();
    res.status(statuscode).json(data);
  } catch (error) {
    console.error("Error in getAll products controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get a single product by ID
 * GET /products/:id
 * @access Public
 */
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const { data, statuscode } = await getProductById(id);
    res.status(statuscode).json(data);
  } catch (error) {
    console.error("Error in getById product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Create a new product
 * POST /products
 * @access Private (Admin only)
 */
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, stock, imageUrl } = req.body;

    // Validate required fields
    if (!name || price === undefined || stock === undefined || !imageUrl) {
      res.status(400).json({ message: "All fields are required (name, price, stock, imageUrl)" });
      return;
    }

    // Validate data types
    if (typeof price !== "number" || price < 0) {
      res.status(400).json({ message: "Price must be a positive number" });
      return;
    }

    if (typeof stock !== "number" || stock < 0) {
      res.status(400).json({ message: "Stock must be a non-negative number" });
      return;
    }

    const { data, statuscode } = await createProduct({
      name,
      price,
      stock,
      imageUrl,
    });

    res.status(statuscode).json(data);
  } catch (error) {
    console.error("Error in create product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Update an existing product
 * PUT /products/:id
 * @access Private (Admin only)
 */
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price, stock, imageUrl } = req.body;

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    // Validate data if provided
    if (price !== undefined && (typeof price !== "number" || price < 0)) {
      res.status(400).json({ message: "Price must be a positive number" });
      return;
    }

    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
      res.status(400).json({ message: "Stock must be a non-negative number" });
      return;
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (price !== undefined) updateData.price = price;
    if (stock !== undefined) updateData.stock = stock;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({ message: "No fields to update" });
      return;
    }

    const { data, statuscode } = await updateProduct(id, updateData);
    res.status(statuscode).json(data);
  } catch (error) {
    console.error("Error in update product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Delete a product
 * DELETE /products/:id
 * @access Private (Admin only)
 */
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    const { data, statuscode } = await deleteProduct(id);
    res.status(statuscode).json(data);
  } catch (error) {
    console.error("Error in delete product controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
