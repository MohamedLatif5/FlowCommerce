import { Request } from "express";
export interface ExtendsRequest extends Request {
  user?: any;
}
