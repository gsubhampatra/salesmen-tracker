import { Request, Response } from 'express';
import { Prisma } from '../../lib/prisma/prismaClinet';

export async function assignSalesman(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { salesManId, locationId , uid} = req.body;

    const assign = await Prisma.assignSalesman.create({
      data: {
        salesManId,
        locationId,
        managerId: uid
      }
    })
    if (!assign) {
      return res.status(400).json({ msg: "SalesMan not assigned" });
    }
    return res.status(201).json({msg: "SalesMan not assigned", assign});
  } catch (err) {
    return res.status(500).json({ msg: 'assign failed', log: err });
  }
}