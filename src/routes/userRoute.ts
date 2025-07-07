import express from "express";
import { loginUser, registerUser } from "../services/userService";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, statuscode } = await registerUser({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(statuscode).send(data);
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, statuscode } = await loginUser({ email, password });
  res.status(statuscode).send(data);
});

export default router;
