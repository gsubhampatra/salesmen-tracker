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

    // calcutate distance
    const location = await Prisma.managedLocation.findUnique({
      where: {
        id: locationId
      }
    })
    if (!location) {
      return res.status(400).json({ msg: "location doesn't exists" });
    }
    // euclidean distance formula- does not work for large distance, as it does not consider the curvature of the earth, better to use haversine formula
    const distance = Math.sqrt(Math.pow(userLatitude - location.latitude, 2) + Math.pow(userLongitude - location.longitude, 2));

    // check if location already exists
    const visitedLocationCheck = await Prisma.visitedLocation.findFirst({
      where: {
        locationId,
        salesManId: user.id
      }
    })
    if (visitedLocationCheck) {
      const visitedLocation = await Prisma.visitedLocation.update({
        where: {
          id: visitedLocationCheck.id
        },
        data: {
          visitCount: visitedLocationCheck.visitCount + 1
        }
      })
      return res.status(200).json({ visitedLocation });
    }

    const visitedLocation = await Prisma.visitedLocation.create({
      data: {
        date,
        locationId,
        UserLatitude: userLatitude,
        UserLongitude: userLongitude,
        salesManId: user.id,
        visitCount: 1,
        scanDistance: distance
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