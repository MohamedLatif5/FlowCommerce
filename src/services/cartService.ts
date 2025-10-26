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
  let cart = await CartModel.findOne({ userId, status: "active" });
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
