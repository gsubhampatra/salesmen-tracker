import { CookieOptions, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;
export const adminCookieName = "sfa_admin_token";
export const cookieOption: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function Login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = req.body;
    const adminemail = "sm.admin@gmail.com";
    const adminpassword = "admin@sm";


    if (SECRET == undefined) {
      console.log("secret is undefined");
      return res.status(500).json({
        status: false,
        msg: "Internal server error",
      });
    }

    if (email == adminemail && password == adminpassword) {
      const token = jwt.sign({ uid: email }, SECRET, { expiresIn: "238h" });
      res.cookie(adminCookieName, token, cookieOption);
 
      return res.status(200).json({
        status: true,
        msg: "Admin login successfully",
        token: token,
      });
    } else {
      return res.status(401).json({
        status: false,
        msg: "Invalid email or password",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: false,
      msg: "an error occured",
      log: e,
    });
  }
}



export const validateDashboardAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.cookies[adminCookieName];
  
    if (!token || token == null || token == undefined)
      return res
        .status(401)
        .json({ msg: 'Unauthorized', log: 'no token found as cookie' });
  
    try {
      if (!SECRET) {
        return res.status(500).json({ msg: 'Server configuration error' });
      }
      const payload = jwt.verify(token, SECRET) as jwt.JwtPayload;
      console.log(payload);
      if (payload.uid !== 'sm.admin@gmail.com') {
        return res.status(401).json({ msg: 'Unauthorized', log: 'not an admin' });
      }
      req.body.uid = payload.uid;
      next();
    } catch (ex) {
      res
        .status(401)
        .json({ msg: 'Invalid or expired token', log: 'catch validate jwt' });
    }
  };