import { Request, Response } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";
import { generateJwt } from "../../lib/jwt/jwt";
import { userCookieName, cookieOption } from "../../lib/cookie/cookie";

export async function salesManLogin(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { uid } = req.body;
    console.log("login", uid);
    const user = await Prisma.salesMan.findUnique({
      where: {
        uid
      }
    })
    if (!user) {
      return res.status(400).json({ msg: "SalesMan not found" });
    }
    const token = generateJwt({ uid });
    res.cookie(userCookieName, token, cookieOption);
    return res.status(200).json({ message: "SalesMan logged in", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'login failed', log: err });
  }
}

export async function getMe(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { uid } = req.body;
    console.log("get me", uid);
    const user = await Prisma.salesMan.findUnique({
      where: {
        uid
      },
      select: {
        id: true,
        name: true,
        uid: true,
        managerId: true,
        Manager: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    })
    if (!user) {
      return res.status(400).json({ msg: "Manager not found" });
    }
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json({ msg: 'get me failed', log: err });
  }
}