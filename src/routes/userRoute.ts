import express from "express";
import { register, login } from "../controllers/userController";

const router = express.Router();

/**
 * POST /user/register
 * Register a new user
 * @access Public
 */
router.post("/register", register);

/**
 * POST /user/login
 * Login a user
 * @access Public
 */
router.post("/login", login);

export default router;
