import { Request, Response } from 'express';
import { Prisma } from '../../lib/prisma/prismaClinet';

export async function addToVisitedLoation(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { uid, locationId, date, userLatitude, userLongitude } = req.body;
    console.log("add location", uid, locationId, date, userLatitude, userLongitude);
    const user = await Prisma.salesMan.findUnique({
      where: {
        uid
      }
    })
    if (!user) {
      return res.status(400).json({ msg: "salesman doesn't exists" });
    }
    const visitedLocation = await Prisma.visitedLocation.create({
      data: {
        date,
        locationId,
        UserLatitude: userLatitude,
        UserLongitude: userLongitude,
        salesManId: user.id
      }
    })
    return res.status(200).json({ visitedLocation });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: 'add location failed', log: err });
  }
  
}

export async function getVisitedLocation(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { uid } = req.body;
    console.log("get visited location", uid);
    const user = await Prisma.salesMan.findUnique({
      where: {
        uid
      }
    })
    if (!user) {
      return res.status(400).json({ msg: "salesman doesn't exists" });
    }
    const visitedLocation = await Prisma.visitedLocation.findMany({
      where: {
        salesManId: user.id
      }
    })
    return res.status(200).json({ visitedLocation });
  } catch (err) {
    return res.status(500).json({ msg: 'get visited location failed', log: err });
  }
}