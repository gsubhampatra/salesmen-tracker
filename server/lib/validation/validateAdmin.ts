import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { adminCookieName, userCookieName } from "../cookie/cookie";
import { jwtSecret } from "../jwt/jwt";

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for token in cookies
  let token = req.cookies[adminCookieName];

  if (!token) {
    // Fallback to checking Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  console.log("token", token);

  if (!token || token == null || token == undefined)
    return res
      .status(401)
      .json({ msg: 'Unauthorized', log: 'no token found as cookie' });

  try {
    const payload = jwt.verify(token, jwtSecret) as { uid: string };
    console.log("jwt verification payload", payload);
    req.body.uid = payload.uid;
    next();
  } catch (ex) {
    res
      .status(401)
      .json({ msg: 'Invalid or expired token', log: 'catch validate admin' });
  }
};


export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for token in cookies
  let token = req.cookies[userCookieName];

  if (!token) {
    // Fallback to checking Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  console.log("token", token);

  if (!token || token == null || token == undefined)
    return res
      .status(401)
      .json({ msg: 'Unauthorized', log: 'no token found as cookie' });

  try {
    const payload = jwt.verify(token, jwtSecret) as { uid: string };
    console.log("jwt verification payload", payload);
    req.body.uid = payload.uid;
    next();
  } catch (ex) {
    res
      .status(401)
      .json({ msg: 'Invalid or expired token', log: 'catch validate admin' });
  }
};