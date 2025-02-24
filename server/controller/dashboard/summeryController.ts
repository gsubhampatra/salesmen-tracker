import { Response, Request } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export const getSalesmanVisits = async (req: Request, res: Response) => {
  const {
    startDate,
    endDate,
    storeType,
    salesmanType,
    page = 1,
    limit = 10,
  } = req.query;

  const where: any = {};
  if (startDate && endDate) {
    where.createdAt = {
      gte: new Date(startDate as string),
      lte: new Date(endDate as string),
    };
  }

  try {
    const visits = await Prisma.assignSalesman.findMany({
      where,
      include: {
        Manager: true,
        SalesMan: true,
        Location: true,
      },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });

    const total = await Prisma.assignSalesman.count({ where });

    const formattedVisits = await Promise.all(
      visits.map(async (visit) => {
        const visitedLocation = await Prisma.visitedLocation.findFirst({
          where: {
            salesManId: visit.salesManId,
            locationId: visit.locationId,
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return {
          state: visit.Location.state,
          storeType: visit.Location.storeType,
          salesmanName: visit.SalesMan.name,
          salesmanType: visit.SalesMan.salesManType,
          storeName: visit.Location.name,
          address: visit.Location.address,
          market: visit.Location.market_name,
          intime: visitedLocation ? visitedLocation.createdAt : null,
          visited: visitedLocation ? "yes" : "no",
          scanDistance: visitedLocation ? visitedLocation.scanDistance : null,
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: formattedVisits,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
