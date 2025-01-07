import { Request, Response } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export async function createSalesMen(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, userid, uid } = req.body;

    //get manage id
    const manager = await Prisma.manager.findUnique({
      where: {
        email: uid
      }
    })
    if(!manager){
      return res.status(400).json({ msg: "Manager not found" });
    }

    const salesMan = await Prisma.salesMan.findUnique({
      where: {
        uid: userid,
      }
    })
    if (salesMan) {
      return res.status(400).json({ msg: "SalesMen already exists" });
    }
    const newSalesMan = await Prisma.salesMan.create({
      data: {
        name, uid: userid, managerId: manager.id,
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

export async function getSalesMenByMannagerId(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { uid } = req.body;
    console.log(uid);
    const salesMen = await Prisma.salesMan.findMany({
      where: {
        Manager: {
          email: uid
        }
      }
    });
    return res.status(200).json({ data: salesMen });
  } catch (err) {
    return res.status(500).json({ msg: 'get salesMen failed', log: err });
  }
}