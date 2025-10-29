import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/userService";

/**
 * Register a new user
 * POST /user/register
 * @access Public
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const { data, statuscode } = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(statuscode).json(data);
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Login a user
 * POST /user/login
 * @access Public
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const { data, statuscode } = await loginUser({ email, password });

    res.status(statuscode).json(data);
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
