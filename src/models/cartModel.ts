import mongoose, { Schema, ObjectId, Document } from "mongoose";

const CartStatus = ["pending", "completed"];

export interface ICartItem {
  product: ObjectId;
  unitPrice: number;
  quantity: number;
}

export interface ICart extends Document {
  userId: ObjectId;
  items: ICartItem[];
  totalAmount: number;
  status: "pending" | "completed";
}

const cartItemSchema = new Schema<ICartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  unitPrice: { type: Number, required: true, min: 0 },
  quantity: { type: Number, required: true, default: 1, min: 1 },
});

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [cartItemSchema],
    totalAmount: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: CartStatus,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model<ICart>("Cart", cartSchema);

export default CartModel;
