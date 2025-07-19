import { userModel } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const generateJWT = (data: any) => {
  return jwt.sign({ data }, process.env.JWT_SECRET as string);
};


// Function to register a new user
export const registerUser = async (params: RegisterParams) => {
  const { firstName, lastName, email, password } = params;
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exists with this email.", statuscode: 400 };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });
  await newUser.save();

  return { data: generateJWT({ firstName, lastName, email }), statuscode: 200 };
};

// Function to login a user
interface loginParams {
  email: string;
  password: string;
}
export const loginUser = async (params: loginParams) => {
  const { email, password } = params;

  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "User not found with this email.", statuscode: 400 };
  }

  const isPasswordValid = await bcrypt.compare(password, findUser.password);
  if (isPasswordValid) {
    return {
      data: generateJWT({
        email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      }),
      statuscode: 200,
    };
  }
  return { data: "incorrect email or password.", statuscode: 400 };
};


