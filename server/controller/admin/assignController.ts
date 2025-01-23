import { Request, Response } from 'express';
import { Prisma } from '../../lib/prisma/prismaClinet';

export async function assignSalesman(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { salesManId, locationId , uid} = req.body;
    console.log("assign", salesManId, locationId, uid);

    //get manager id
    const manager = await Prisma.manager.findUnique({
      where: {
        email: uid
      }
    });
    if (!manager) {
      return res.status(400).json({ msg: "Manager not found" });
    }

    const assign = await Prisma.assignSalesman.create({
      data: {
        salesManId,
        locationId,
        managerId: manager.id
      }
    })
    if (!assign) {
      return res.status(400).json({ msg: "SalesMan not assigned" });
    }
    return res.status(201).json({msg: "SalesMan not assigned", assign});
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: 'assign failed', log: err });
  }
}