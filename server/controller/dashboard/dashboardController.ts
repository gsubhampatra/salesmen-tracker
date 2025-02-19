import { Response,Request } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function welcomeToDashboard(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(200).json({ message: "Welcome to  Dashboard" });
}

export const getTotalSalesmen = async (req: Request, res: Response) => {
  try {
    const totalSalesmen = await prisma.salesMan.count();
    return res.status(200).json({ totalSalesmen });
  } catch (error) {
    console.error("Error fetching total salesmen:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSalesmenVisitedToday = async (req: Request, res: Response) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalVisited = await prisma.visitedLocation.count({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    return res.status(200).json({ totalVisited });
  } catch (error) {
    console.error("Error fetching salesmen visited today:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getSalesmenNotVisitedToday = async (req: Request, res: Response) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Get total salesmen
    const totalSalesmen = await prisma.salesMan.count();

    // Get salesmen who visited today using `findMany`
    const visitedToday = await prisma.visitedLocation.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        salesManId: true,
      },
      distinct: ["salesManId"], // ✅ This works
    });

    const notVisited = totalSalesmen - visitedToday.length;

    return res.status(200).json({ notVisited });
  } catch (error) {
    console.error("Error fetching salesmen not visited today:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
