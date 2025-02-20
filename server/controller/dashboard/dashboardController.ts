import { Response, Request } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export async function welcomeToDashboard(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(200).json({ message: "Welcome to  Dashboard" });
}

export const getTotalSalesmen = async (req: Request, res: Response) => {
  try {
    const totalSalesmen = await Prisma.salesMan.count();
    return res
      .status(200)
      .json({ totalSalesmen, msg: "total salesman get successfully" });
  } catch (error) {
    console.error("Error fetching total salesmen:", error);
    return res
      .status(500)
      .json({ msg: "error in getting total salesmen", error });
  }
};

export const getSalesmenVisitedToday = async (req: Request, res: Response) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const totalVisited = await Prisma.visitedLocation.count({
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
    return res
      .status(500)
      .json({ msg: "error in getting salesmen visited today", error });
  }
};

export const getSalesmenNotVisitedToday = async (
  req: Request,
  res: Response
) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Get total salesmen
    const totalSalesmen = await Prisma.salesMan.count();

    // Get salesmen who visited today using `findMany`
    const visitedToday = await Prisma.visitedLocation.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      select: {
        salesManId: true,
      },
      distinct: ["salesManId"], 
    });

    const notVisited = totalSalesmen - visitedToday.length;

    return res.status(200).json({ notVisited });
  } catch (error) {
    console.error("Error fetching salesmen not visited today:", error);
    return res
      .status(500)
      .json({ msg: "error in getting salesmen not visited today", error });
  }
};

export const getAllSalesmen = async (req: Request, res: Response) => {
  try {
    const salesmen = await Prisma.salesMan.findMany({
      include: {
        Manager: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        visitedLocations: true, // Includes the locations they visited
        AssignSalesman: {
          include: {
            Location: true, // Includes assigned locations
          },
        },
      },
    });

    return res.status(200).json(salesmen);
  } catch (error) {
    console.error("Error fetching salesmen list:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getDistributorSalesmenDetails = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    const salesmenData = await Prisma.salesMan.findMany({
      where: {
        AssignSalesman: {
          some: {
            Location: {
              storeType: "DISTRIBUTOR", // Only Distributor type locations
            },
          },
        },
      },
      include: {
        AssignSalesman: {
          include: {
            Location: true, // Include location details
          },
        },
        visitedLocations: {
          where: {
            date: {
              gte: today, // Filter visits for today
            },
          },
          orderBy: {
            date: "asc", // Order by time to get in-time and out-time
          },
        },
      },
    });

    const formattedData = salesmenData.map((salesman) => {
      const visitedLocations = salesman.visitedLocations;

      // Determine In-Time (earliest visit of the day)
      const inTime = visitedLocations.length > 0 ? visitedLocations[0].date : null;

      // Determine Out-Time (latest visit if multiple)
      const outTime = visitedLocations.length > 1 ? visitedLocations[visitedLocations.length - 1].date : null;

      // Total number of outlets visited today
      const outletsVisited = visitedLocations.length;

      // Total number of assigned outlets
      const outletsAssigned = salesman.AssignSalesman.length;

      // Calculate accuracy percentage (over 100 meters non-accurate)
      const inaccurateVisits = visitedLocations.filter((visit) => visit.scanDistance > 100).length;
      const accuracyPercentage = outletsVisited > 0 ? ((outletsVisited - inaccurateVisits) / outletsVisited) * 100 : 0;

      // Calculate distance traveled
      let totalDistance = 0;
      for (let i = 1; i < visitedLocations.length; i++) {
        const prev = visitedLocations[i - 1];
        const curr = visitedLocations[i];

        if (prev.UserLatitude && prev.UserLongitude && curr.UserLatitude && curr.UserLongitude) {
          totalDistance += getHaversineDistance(
            prev.UserLatitude,
            prev.UserLongitude,
            curr.UserLatitude,
            curr.UserLongitude
          );
        }
      }

      return {
        salesmanName: salesman.name,
        salesmanType: salesman.salesManType,
        region: salesman.AssignSalesman[0]?.Location.region || "N/A",
        state: salesman.AssignSalesman[0]?.Location.state || "N/A",
        marketName: salesman.AssignSalesman[0]?.Location.market_name || "N/A",
        inTime,
        outTime,
        outletsVisited,
        outletsAssigned,
        accuracyPercentage: accuracyPercentage.toFixed(2) + "%",
        distanceTravelled: totalDistance.toFixed(2) + " km",
      };
    });

    res.status(200).json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching distributor salesmen details:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Haversine formula to calculate distance between two points
const getHaversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};










