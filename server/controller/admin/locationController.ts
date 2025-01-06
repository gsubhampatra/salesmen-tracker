import { Request, Response } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export async function createLocation(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { name, address, latitude, longitude, managerId } = req.body;
    const location = await Prisma.managedLocation.findFirst({
      where: {
        name: name, managerId, address, latitude, longitude
      }
    })
    if (location) {
      return res.status(400).json({ msg: "Location already exists" });
    }
    const newLocation = await Prisma.managedLocation.create({
      data: {
        name, address, managerId, latitude, longitude
      }
    })
    if (!newLocation) {
      return res.status(400).json({ msg: "Location not created" });
    }
    return res.status(201).json({ message: "Location created", data: newLocation });
  } catch (err) {
    return res.status(500).json({ msg: 'create location failed', log: err });
  }
}

export async function getAllLocations(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const locations = await Prisma.managedLocation.findMany();
    return res.status(200).json({ data: locations });
  } catch (err) {
    return res.status(500).json({ msg: 'get locations failed', log: err });
  }
}

export async function getLocationsByMannagerId(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { uid } = req.body;
    const locations = await Prisma.managedLocation.findMany({
      where: {
        Manager: {
          email: uid
        }
      }
    });
    return res.status(200).json({ data: locations });
  } catch (err) {
    return res.status(500).json({ msg: 'get locations failed', log: err });
  }
}