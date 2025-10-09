import express from "express";
import validateJWT, { extendsRequest } from "../middlewares/validateJWT";
import { getCartUser } from "../services/cartService";


const router = express.Router();

router.get("/", validateJWT, async (req: extendsRequest, res) => {
 const userId = req.user._id;
  const cart = await getCartUser({userId});
  res.status(200).json(cart);
});

export default router;
