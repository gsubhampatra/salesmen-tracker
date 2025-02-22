import { Response, Request } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export async function welcomeToDashboard(
  req: Request,
  res: Response
): Promise<Response> {
  return res.status(200).json({ message: "Welcome to  Dashboard" });
}

export const getSalesmenCount = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const allSalesmen = await Prisma.salesMan.groupBy({
      by: ["salesManType"],
      _count: {
        salesManType: true,
      },
    });

    const resData = allSalesmen.map((salesman) => ({
      salesManType: salesman.salesManType,
      count: salesman._count.salesManType,
    }));
    const total = resData.reduce((acc, curr) => acc + curr.count, 0);

    return res
      .status(200)
      .json({ msg: "all salesmen fetched", salesmen: { resData, total } });
  } catch (error) {
    console.error("Error fetching all salesmen:", error);
    return res.status(500).json({
      msg: "Error in getting all salesmen",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getStoreCount = async (req: Request, res: Response) => {
  try {
    const managersLocations = await Prisma.managedLocation.groupBy({
      by: ["storeType"],
      _count: {
        storeType: true,
      },
    });

    const resData = managersLocations.map((location) => ({
      storeType: location.storeType,
      count: location._count.storeType,
    }));
    const total = resData.reduce((acc, curr) => acc + curr.count, 0);

    return res
      .status(200)
      .json({ stores: { resData, total }, msg: "managers locations fetched" });
  } catch (error) {
    console.error("Error fetching managers locations:", error);
    return res
      .status(500)
      .json({ msg: "error in getting managers locations", error });
  }
};

export const getAllSalesmen = async (req: Request, res: Response) => {
  try {
    const allSalesmen = await Prisma.salesMan.findMany();

    return res.status(200).json({ msg: "all salesmen fetched", allSalesmen });
  } catch (error) {
    console.error("Error fetching all salesmen:", error);
    return res.status(500).json({
      msg: "Error in getting all salesmen",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getAllStores = async (req: Request, res: Response) => {
  try {
    const allStores = await Prisma.managedLocation.findMany();

    return res.status(200).json({ msg: "all stores fetched", allStores });
  } catch (error) {
    console.error("Error fetching all stores:", error);
    return res.status(500).json({
      msg: "Error in getting all stores",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

interface DateQueryParams {
  date?: string;
}

interface VisitDateRange {
  date: {
    gte: Date;
    lte: Date;
  };
}

export const getSalesmenVisitedByDate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { date } = req.query as DateQueryParams;
    const today = new Date();
    const dateToUse = date ? new Date(date) : today;
    if (isNaN(dateToUse.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
    const startOfDay = new Date(dateToUse);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(dateToUse);
    endOfDay.setHours(23, 59, 59, 999);

    const where: VisitDateRange = {
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
    };

    const totalVisited = await Prisma.visitedLocation.count({ where });

    return res
      .status(200)
      .json({ msg: "salesmen visited fetched", totalVisited, date: dateToUse });
  } catch (error) {
    console.error("Error fetching salesmen visited:", error);
    return res.status(500).json({
      msg: "Error in getting salesmen visited",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getSalesmanInTimeOutTime = async (req: any, res: any) => {
  try {
    const { salesmanId } = req.params;
    const { date: dateString } = req.query as DateQueryParams;

    const date = dateString ? new Date(dateString) : new Date();
    if (isNaN(date.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    date.setHours(0, 0, 0, 0);

    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    // Fetch visited locations for the salesman on the given date
    const visitedLocations = await Prisma.visitedLocation.findMany({
      where: {
        salesManId: parseInt(salesmanId),
        date: {
          gte: date,
          lt: nextDay,
        },
      },
      orderBy: {
        date: "asc", // Ensure chronological order
      },
    });

    let inTime: Date | null = null;
    let outTime: Date | null = null;

    if (visitedLocations.length > 0) {
      inTime = visitedLocations[0].date; // First visit is the in-time
      outTime = visitedLocations[visitedLocations.length - 1].date; // Last visit is the out-time
    }

    res.status(200).json({
      salesmanId: parseInt(salesmanId),
      date: date,
      inTime: inTime ? inTime.toISOString() : null,
      outTime: outTime ? outTime.toISOString() : null,
    });
  } catch (error) {
    console.error("Error fetching salesman time analysis:", error);
    res.status(500).json({ error: "Failed to fetch salesman time analysis" });
  }
};
export const getVisitedOutletsBySalesman = async (req: any, res: any) => {
  try {
    const { salesmanId } = req.params;
    const { date } = req.query as DateQueryParams;

    // Validate date
    if (!date) {
      return res
        .status(400)
        .json({ error: "Date parameter is required in YYYY-MM-DD format." });
    }

    const startDate = new Date(date);
    if (isNaN(startDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
    startDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    // Fetch visited locations for the salesman on the given date
    const visitedLocations = await Prisma.visitedLocation.findMany({
      where: {
        salesManId: parseInt(salesmanId),
        date: {
          gte: startDate,
          lt: nextDay,
        },
      },
      orderBy: {
        date: "asc", // Ensure chronological order
      },
    });

    // Structure the response
    const Visitedlocations = visitedLocations.map((location) => ({
      locationId: location.locationId,
      salesmanId: location.salesManId,
      visitTime: location.date.toISOString(),
    }));

    res.status(200).json({
      salesmanId: parseInt(salesmanId),
      date: date,
      visitedOutlets: Visitedlocations,
      totalVisited: Visitedlocations.length,
    });
  } catch (error) {
    console.error("Error fetching visited outlets by salesman:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch visited outlets by salesman" });
  }
};

export const getAssignedOutletsBySalesman = async (req: any, res: any) => {
  try {
    const { salesmanId } = req.params;
    const { date } = req.query as DateQueryParams;

    // Validate date
    if (!date) {
      return res
        .status(400)
        .json({ error: "Date parameter is required in YYYY-MM-DD format." });
    }

    const startDate = new Date(date);
    if (isNaN(startDate.getTime())) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }
    startDate.setHours(0, 0, 0, 0);

    const nextDay = new Date(startDate);
    nextDay.setDate(startDate.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    // Fetch assigned Outlates for the salesman on the given date
    const assignedOutlets = await Prisma.assignSalesman.findMany({
      where: {
        salesManId: parseInt(salesmanId),
        createdAt: {
          lte: startDate,
          gte: nextDay,
        },
      },
      orderBy: {
        createdAt: "asc", // Ensure chronological order
      },
    });

    // Structure the response
    const assignedOutletsList = assignedOutlets.map((location) => ({
      locationId: location.locationId,
      salesmanId: location.salesManId,
      assignedTime: location.createdAt.toISOString(),
    }));

    res.status(200).json({
      salesmanId: parseInt(salesmanId),
      date: date,
      assignedOutlets: assignedOutletsList,
      totalAssigned: assignedOutletsList.length,
    });
  } catch (error) {
    console.error("Error fetching assigned outlets by salesman:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch assigned outlets by salesman" });
  }
};

const earthRadius = 6371e3;

export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance;
};

interface AccuracyAnalysisQuery {
  startDate?: string; // ISO 8601 date string (YYYY-MM-DD)
  endDate?: string; // ISO 8601 date string (YYYY-MM-DD)
}

export const getAccuracyAnalysis = async (req: any, res: any) => {
  try {
    const { startDate: startDateString, endDate: endDateString } =
      req.query as AccuracyAnalysisQuery;

    // Validate and parse dates (same logic as before)
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (startDateString) {
      startDate = new Date(startDateString);
      if (isNaN(startDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid startDate format. Use YYYY-MM-DD." });
      }
      startDate.setHours(0, 0, 0, 0);
    }

    if (endDateString) {
      endDate = new Date(endDateString);
      if (isNaN(endDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid endDate format. Use YYYY-MM-DD." });
      }
      endDate.setHours(23, 59, 59, 999);
    }

    // Fetch all visited locations within the specified date range
    const visitedLocations = await Prisma.visitedLocation.findMany({
      where: {
        ...(startDate || endDate
          ? {
              date: {
                ...(startDate ? { gte: startDate } : {}),
                ...(endDate ? { lte: endDate } : {}),
              },
            }
          : {}),
      },
      include: {
        Location: true, // Include the ManagedLocation data
      },
    });

    const accuracyThreshold = 100; // meters
    let accurateVisits = 0;

    for (const visit of visitedLocations) {
      if (visit.Location) {
        const distance = calculateDistance(
          visit.UserLatitude,
          visit.UserLongitude,
          visit.Location.latitude,
          visit.Location.longitude
        );

        if (distance <= accuracyThreshold) {
          accurateVisits++;
        }
      }
    }

    const totalVisits = visitedLocations.length;
    const accuracyPercentage =
      totalVisits > 0 ? (accurateVisits / totalVisits) * 100 : 0;

    res.status(200).json({
      accuracyPercentage,
      accuracyThreshold,
      totalVisits,
      accurateVisits,
    });
  } catch (error) {
    console.error("Error fetching accuracy analysis:", error);
    res.status(500).json({ error: "Failed to fetch accuracy analysis" });
  }
};
export const getAccuracyBySalesman = async (req: any, res: any) => {
  try {
    const { salesmanId: salesmanIdString } = req.params;

    const { startDate: startDateString, endDate: endDateString } =
      req.query as AccuracyAnalysisQuery;

    const salesmanId = parseInt(salesmanIdString);

    if (isNaN(salesmanId)) {
      return res
        .status(400)
        .json({ error: "Invalid salesmanId format. Must be a number." });
    }

    // Validate and parse dates (same logic as before)
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    if (startDateString) {
      startDate = new Date(startDateString);
      if (isNaN(startDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid startDate format. Use YYYY-MM-DD." });
      }
      startDate.setHours(0, 0, 0, 0);
    }

    if (endDateString) {
      endDate = new Date(endDateString);
      if (isNaN(endDate.getTime())) {
        return res
          .status(400)
          .json({ error: "Invalid endDate format. Use YYYY-MM-DD." });
      }
      endDate.setHours(23, 59, 59, 999);
    }

    // Fetch all visited locations within the specified date range for the given salesman
    const visitedLocations = await Prisma.visitedLocation.findMany({
      where: {
        salesManId: salesmanId,
        ...(startDate || endDate
          ? {
              date: {
                ...(startDate ? { gte: startDate } : {}),
                ...(endDate ? { lte: endDate } : {}),
              },
            }
          : {}),
      },
      include: {
        Location: true, // Include the ManagedLocation data
      },
    });

    const accuracyThreshold = 100; // meters
    let accurateVisits = 0;

    for (const visit of visitedLocations) {
      if (visit.Location) {
        const distance = calculateDistance(
          visit.UserLatitude,
          visit.UserLongitude,
          visit.Location.latitude,
          visit.Location.longitude
        );

        if (distance <= accuracyThreshold) {
          accurateVisits++;
        }
      }
    }

    const totalVisits = visitedLocations.length;
    const accuracyPercentage =
      totalVisits > 0 ? (accurateVisits / totalVisits) * 100 : 0;

    res.status(200).json({
      salesmanId,
      accuracyPercentage,
      accuracyThreshold,
      totalVisits,
      accurateVisits,
    });
  } catch (error) {
    console.error("Error fetching accuracy by salesmanId:", error);
    res.status(500).json({ error: "Failed to fetch accuracy by salesmanId" });
  }
};

//testing
export const getAllVisitedLocations = async (req: any, res: any) => {
  try {
    const visitedLocations = await Prisma.visitedLocation.findMany({
      include: {
        Location: true,
      },
    });

    res.status(200).json({ visitedLocations });
  } catch (error) {
    console.error("Error fetching all visited locations:", error);
    res.status(500).json({ error: "Failed to fetch all visited locations" });
  }
};
export const getAllAssignedLocations = async (req: any, res: any) => {
  try {
    const assignedLocations = await Prisma.assignSalesman.findMany({
      include: {
        Location: true,
      },
    });

    res.status(200).json({ assignedLocations });
  } catch (error) {
    console.error("Error fetching all assigned locations:", error);
    res.status(500).json({ error: "Failed to fetch all assigned locations" });
  }
};

// distributer
export const getAllSalesmens = async (req: Request, res: Response) => {
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

export async function getDistributorReport(req: Request, res: Response) {
  try {
    const date = req.query?.date
      ? new Date(req.query.date as string)
      : new Date();

    // Get start and end of the queried date
    const startDate = new Date(date.setHours(0, 0, 0, 0));
    const endDate = new Date(date.setHours(23, 59, 59, 999));

    // Fetch all distributor locations
    const distributors = await Prisma.managedLocation.findMany({
      where: {
        storeType: "DISTRIBUTOR",
      },
      include: {
        Manager: true,
        VisitedLocation: {
          where: {
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
          orderBy: {
            date: "asc", // Sorting by time for in-time & out-time calculation
          },
        },
        AssignSalesman: true,
      },
    });

    const analytics = distributors.map((location) => {
      const visits = location.VisitedLocation;
      const assignments = location.AssignSalesman;

      const inTime = visits.length > 0 ? visits[0].date : null;

      const outTime = visits.length > 0 ? visits[visits.length - 1].date : null;

      // No. of Outlets Visited
      const outletsVisited = visits.length;

      // No. of Outlets Assigned
      const outletsAssigned = assignments.length;

      // Accuracy Calculation (Over 100m non-accurate)
      const accurateVisits = visits.filter(
        (visit) => visit.scanDistance <= 100
      ).length;
      const accuracyPercentage = (accurateVisits / visits.length) * 100;

      return {
        storeName: location.name,
        marketName: location.market_name,
        address: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
        managerName: location.Manager.name,
        region: location.region,
        state: location.state,
        inTime: inTime
          ? Math.round(inTime.getHours() * 60 + inTime.getMinutes())
          : null, // Convert time to minutes
        outTime: outTime
          ? Math.round(outTime.getHours() * 60 + outTime.getMinutes())
          : null,
        outletsVisited,
        outletsAssigned,
        accuracyPercentage: Math.round(accuracyPercentage * 100) / 100,
        assignedSalesmans: assignments.map((a) => a.salesManId),
      };
    });
    console.log(distributors[0]);

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Error fetching distributor analytics:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch distributor analytics",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
