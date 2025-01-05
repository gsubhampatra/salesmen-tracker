import { Request, Response } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export async function createSalesMen(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, uid, managerId } = req.body;
    const salesMan = await Prisma.salesMan.findUnique({
      where: {
        uid: uid,
      }
    })
    if (salesMan) {
      return res.status(400).json({ msg: "SalesMen already exists" });
    }
    const newSalesMan = await Prisma.salesMan.create({
      data: {
        name, uid, managerId,
      }
    })
    if (!newSalesMan) {
      return res.status(400).json({ msg: "SalesMen not created" });
    }
    return res.status(201).json({ message: "SalesMen created", data: newSalesMan });
  } catch (err) {
    return res.status(500).json({ msg: 'login failed', log: err });
  }
}

export async function getAllSalesMen(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const salesMen = await Prisma.salesMan.findMany();
    return res.status(200).json({ data: salesMen });
  } catch (err) {
    return res.status(500).json({ msg: 'get salesMen failed', log: err });
  }
}