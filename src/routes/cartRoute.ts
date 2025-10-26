import express from "express";
import { getCartUser } from "../services/cartService";
import validateJWT from "../middlewares/validateJWT";
import { ExtendsRequest } from "../types/extendsRequest";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendsRequest, res) => {
  const userId = req?.user?._id;
  const cart = await getCartUser({ userId });
  res.status(200).json(cart);
});

export default router;
