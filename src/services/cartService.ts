import CartModel from "../models/cartModel";

interface CartUser {
  userId: string;
}

const creatCartUser = async ({ userId }: CartUser) => {
  const cart = await CartModel.create({ userId, totalAmount: 0 });
  return cart;
};

interface getCartUser {
  userId: string;
}
export const getCartUser = async ({ userId }: getCartUser) => {
  let cart = await CartModel.findOne({ userId, status: "active" });
  if (!cart) {
    cart = await creatCartUser({ userId });
  }
  return cart;
};
