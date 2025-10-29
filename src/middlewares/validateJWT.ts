import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import { ExtendsRequest } from "../types/extendsRequest";

// validate JWT
const validateJWT = (
  req: ExtendsRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get("authorization");

  if (!authHeader) {
    res.status(403).json("No authorization token was found");
    return;
  }

  // extract token
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(403).json("No token was found");
    return;
  }

  // verify token
  jwt.verify(token, process.env.JWT_SECRET as string, async (err, payload) => {
    if (err) {
      res.status(403).json("Invalid token");
      return;
    }
    if (!payload) {
      res.status(403).json("Invalid token payload");
      return;
    }

    // extract payload
    const userPayload = payload as {
      data: {
        email: string;
        firstName: string;
        lastName: string;
      };
    };

    // fetch user from Database
    const user = await userModel.findOne({ email: userPayload.data.email });
    req.user = user;
    next();
  });
};

export default validateJWT;
