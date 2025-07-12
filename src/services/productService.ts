import ProductModel from "../models/productModel";

// Get all products from the database

export const getAllProducts = async () => {
  try {
    const products = await ProductModel.find();
    return { data: products, statuscode: 200 };
  } catch (error) {
    return { data: "Error fetching products", statuscode: 500 };
  }
};

// Get a product by its ID

export const getProductById = async (id: string) => {
  try {
    const product = await ProductModel.findById(id);
    if (!product) {
      return { data: "Product not found", statuscode: 404 };
    }
    return { data: product, statuscode: 200 };
  } catch (error) {
    return { data: "Error fetching product", statuscode: 500 };
  }
};

// Create a new product

interface CreateProductParams {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}
export const createProduct = async (params: CreateProductParams) => {
  try {
    const newProduct = new ProductModel(params);
    await newProduct.save();
    return { data: newProduct, statuscode: 201 };
  } catch (error) {
    return {
      data: "Error creating product",
      statuscode: 500,
    };
  }
};

 //Update an existing product
// @param id Product ID to update

export const updateProduct = async (
  id: string,
  params: Partial<CreateProductParams>
) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, params, {
      new: true,
    });

    if (!updatedProduct) {
      return { data: "Product not found", statuscode: 404 };
    }

    return { data: updatedProduct, statuscode: 200 };
  } catch (error) {
    return { data: "Error updating product", statuscode: 500 };
  }
};

//Delete a product

export const deleteProduct = async (id: string) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return { data: "Product not found", statuscode: 404 };
    }

    return { data: deletedProduct, statuscode: 200 };
  } catch (error) {
    return { data: "Error deleting product", statuscode: 500 };
  }
};
