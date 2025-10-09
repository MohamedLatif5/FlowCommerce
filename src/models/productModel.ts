import mongoose, { Document, Schema } from "mongoose";
export interface IProduct extends Document {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

const ProductModel = mongoose.model<IProduct>("Product", productSchema);

export default ProductModel;
