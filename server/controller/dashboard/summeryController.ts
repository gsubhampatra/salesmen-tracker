import { Response, Request } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export const getSalesmanVisits = async (req: Request, res: Response) => {
  try {
    const visits = await Prisma.assignSalesman.findMany({
      include: {
        Manager: true,
        SalesMan: true,
        Location: true,
      },
    });

    const formattedVisits = await Promise.all(
      visits.map(async (visit) => {
        // Fetch visited location details
        const visitedLocation = await Prisma.visitedLocation.findFirst({
          where: {
            salesManId: visit.salesManId,
            locationId: visit.locationId,
          },
          orderBy: {
            createdAt: "asc", // Get earliest visit time
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

    return res.status(200).json({ success: true, data: formattedVisits });
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getSalesmanVisitsByDate = async (req: Request, res: Response) => {
  try {
 
    // Fetch assigned salesman visits WITH pagination and filtering
    const visits = await Prisma.assignSalesman.findMany({
      include: {
        Manager: true,
        SalesMan: true,
        Location: true,
      },

    });

    const formattedVisits = await Promise.all(
      visits.map(async (visit) => {
        // Fetch visited location details
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
          region: visit.Location.region,
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
          date: visit.createdAt,
        };
      })
    );

    return res.status(200).json({
      success: true,
      data: formattedVisits,
    });
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  } finally {
    await Prisma.$disconnect();
  }
};

export const getAccuracyPercentage = async (req: Request, res: Response) => {
  try { 
    const totalVisits = await Prisma.visitedLocation.count();
    const inaccurateVisits = await Prisma.visitedLocation.count({
      where: { scanDistance: { gt: 100 } },
    });
    const accuracyPercentage = (totalVisits - inaccurateVisits) / totalVisits;
    return res.status(200).json({ accuracyPercentage });
  } catch (error) {
    console.error("Error fetching accuracy:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getAvgDailyVisits = async (req: Request, res: Response) => {
  try {
    const visits = await Prisma.visitedLocation.findMany();

    const totalDays = Math.ceil(
      (new Date().getTime() - visits[0]?.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    const avgDailyVisits = visits.length / totalDays;
    return res.status(200).json({ avgDailyVisits });
  } catch (error) {
    console.error("Error fetching daily avg visits:", error);
    res.status(500).json({ error: (error as Error).message });
  }
};

