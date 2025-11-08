import CartModel from "../models/cartModel";
import ProductModel from "../models/productModel";
import mongoose, { ObjectId } from "mongoose";

interface CartUser {
  userId: string;
}

const creatCartUser = async ({ userId }: CartUser) => {
  const cart = await CartModel.create({ userId, totalAmount: 0, items: [] });
  return cart;
};

interface GetCartUserParams {
  userId: string;
}
export const getCartUser = async ({ userId }: GetCartUserParams) => {
  let cart = await CartModel.findOne({ userId, status: "pending" });
  if (!cart) {
    cart = await creatCartUser({ userId });
  }
  return cart;
};
// Add item to cart
interface AddItemToCartParams {
  userId: string;
  productId: string;
  quantity: number;
}

export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: AddItemToCartParams) => {
  // Retrieve the user's cart (or create a new one if it doesn't exist)
  const cart = await getCartUser({ userId });

  // check if the product exists in the cart
  const existsInCart = cart.items.find(
    (p) => p.product.toString() === productId
  );

  if (existsInCart) {
    return { data: "Item already exists in the cart", statusCode: 400 };
  }

  // Check that the product exists in the database
  const product = await ProductModel.findById(productId);
  if (!product) {
    return { data: "Product not found", statusCode: 404 };
  }

  cart.items.push({
    product: product._id as ObjectId,
    unitPrice: product.price,
    quantity,
  });
  // calculate and update the total amount
  cart.totalAmount += product.price * quantity;

  // Save the cart
  const updateCart = await cart.save();

  return { data: updateCart, statusCode: 200 };
};

// Update item in cart
interface UpdateItemInCartParams {
  userId: string;
  productId: string;
  quantity: number;
}

export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCartParams) => {
  // Retrieve the user's cart
  const cart = await getCartUser({ userId });

  // Find the item in the cart
  const itemIndex = cart.items.findIndex(
    (p) => p.product.toString() === productId
  );

  if (itemIndex === -1) {
    return { data: "Item not found in cart", statusCode: 404 };
  }

  // Get the old quantity to adjust total amount
  const oldQuantity = cart.items[itemIndex].quantity;
  const unitPrice = cart.items[itemIndex].unitPrice;

  // Update the quantity
  cart.items[itemIndex].quantity = quantity;

  // Recalculate total amount
  cart.totalAmount += unitPrice * (quantity - oldQuantity);

  // Save the cart
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};

// Delete item from cart
interface DeleteItemFromCartParams {
  userId: string;
  productId: string;
}

export const deleteItemFromCart = async ({
  userId,
  productId,
}: DeleteItemFromCartParams) => {
  // Retrieve the user's cart
  const cart = await getCartUser({ userId });

  // Find the item in the cart
  const itemIndex = cart.items.findIndex(
    (p) => p.product.toString() === productId
  );

  if (itemIndex === -1) {
    return { data: "Item not found in cart", statusCode: 404 };
  }

  // Get the item details before removing
  const item = cart.items[itemIndex];
  const itemTotal = item.unitPrice * item.quantity;

  // Remove the item from cart
  cart.items.splice(itemIndex, 1);

  // Update total amount
  cart.totalAmount -= itemTotal;

  // Save the cart
  const updatedCart = await cart.save();

  return { data: updatedCart, statusCode: 200 };
};
