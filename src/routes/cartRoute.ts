import express, { Response } from "express";
import { getCartUser, addItemToCart } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendsRequest } from "../types/extendsRequest";

const router = express.Router();

// get cart
router.get("/", validateJWT, async (req: ExtendsRequest, res: Response) => {
  const userId = req?.user?._id;
  const cart = await getCartUser({ userId });
  res.status(200).json(cart);
});

//
router.post("/items", validateJWT, async (req: ExtendsRequest, res: Response) => {
  
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;

    const response = await addItemToCart({ userId, productId, quantity });
    res.status(response.statusCode || 200).json(response.data);
 
});

export default router;
