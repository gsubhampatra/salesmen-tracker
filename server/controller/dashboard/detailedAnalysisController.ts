import { Response, Request } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";



export const getTotalSalesmen = async (req: Request, res: Response) => {
  try {
    const count = await Prisma.salesMan.count();
    res.json({ totalSalesmen: count });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const getTotalLocationsManaged = async (req: Request, res: Response) => {
    try {
      const count: number = await Prisma.managedLocation.count();
      res.json({ totalLocations: count });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export const getTotalVisitsMade = async (req: Request, res: Response) => {
    try {
      const count: number = await Prisma.visitedLocation.count();
      res.json({ totalVisits: count });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export const getOverallAccuracy = async (req: Request, res: Response) => {
    try {
      const totalVisits: number = await Prisma.visitedLocation.count();
      const inaccurateVisits: number = await Prisma.visitedLocation.count({
        where: { scanDistance: { gt: 100 } },
      });
  
      console.log("Total Visits:", totalVisits);
      console.log("Inaccurate Visits:", inaccurateVisits);
  
      if (totalVisits === 0) {
        return res.json({ accuracyPercentage: "No visits recorded" });
      }
  
      const accuracyPercentage: number = ((totalVisits - inaccurateVisits) / totalVisits) * 100;
  
      res.json({ accuracyPercentage: accuracyPercentage.toFixed(2) });
    } catch (error) {
      console.error("Error fetching accuracy:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
export const getMostVisitedLocations = async (req: Request, res: Response) => {
    try {
      const locations = await Prisma.visitedLocation.groupBy({
        by: ["locationId"],
        _count: { locationId: true },
        orderBy: { _count: { locationId: "desc" } },
        take: 10,
      });
  
      const locationIds = locations.map((loc) => loc.locationId);
  
      // Fetch location names for the top 10 locations
      const locationDetails = await Prisma.managedLocation.findMany({
        where: { id: { in: locationIds } },
        select: { id: true, name: true },
      });
  
      // Map location names to the grouped visit data
      const mostVisitedLocations = locations.map((loc) => {
        const location = locationDetails.find((l) => l.id === loc.locationId);
        return {
          locationId: loc.locationId,
          locationName: location?.name || "Unknown",
          visitCount: loc._count.locationId,
        };
      });
  
      res.json({ mostVisitedLocations });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
  

export const getRegionWiseSalesmanCount = async (req: Request, res: Response) => {
    try {
      const regions = await Prisma.managedLocation.groupBy({
        by: ["region"],
        _count: { id: true },
      });
  
      res.json({ regionSalesmanCount: regions });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export const getStateWiseVisitDistribution = async (req: Request, res: Response) => {
    try {
      const states = await Prisma.managedLocation.groupBy({
        by: ["state"],
        _count: { id: true },
      });
  
      res.json({ stateVisitDistribution: states });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export const gettotalOutletsAssigned = async (req: Request, res: Response) => {
    try {
        const uniqueLocations = await Prisma.assignSalesman.groupBy({
            by: ["locationId"], // Group by unique locationId
            _count: { locationId: true }, // Count occurrences
        });

        const count: number = uniqueLocations.length; // Get total unique locations

        res.json({ totalOutletsAssigned: count });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};


export const gettotalOutletsVisited = async (req: Request, res: Response) => {
  try {
    console.log("Fetching total unique outlets visited...");

    // Fetch unique location IDs from visitedLocation
    const uniqueOutlets = await Prisma.visitedLocation.findMany({
      select: { locationId: true },
      distinct: ["locationId"],
    });

    console.log("Unique outlets visited:", uniqueOutlets.length, uniqueOutlets);

    return res.json({ totalOutletsVisitedd: uniqueOutlets.length });
  } catch (error) {
    console.error("Error fetching total outlets visited:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
};


interface AnalyticsResponse {
  state: string;
  storeType: string;
  salesmanName: string;
  salesmanType: string;
  inTime: string | null;
  outTime: string | null;
  outletsVisited: number;
  outletsAssigned: number;
  accuracyPercentage: number;
}

export const getLocationAnalytics = async (req: Request, res: Response) => {
  try {
    console.log("Fetching updated location analytics...");

    // Get visited locations with related data
    const visitedLocations = await Prisma.visitedLocation.findMany({
      include: {
        Location: true,
        SalesMan: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    console.log(`Total locations visited: ${visitedLocations.length}`);

    // Get assigned locations count for each salesman
    const assignedLocations = await Prisma.assignSalesman.groupBy({
      by: ["salesManId"],
      _count: {
        locationId: true,
      },
    });

    // Create a map for quick lookup of assigned locations count
    const assignedLocationsMap = new Map(
      assignedLocations.map((item) => [item.salesManId, item._count.locationId])
    );

    console.log(`Total unique salesmen with assigned locations: ${assignedLocations.length}`);

    // Group visits by salesman
    const visitsBySalesman = visitedLocations.reduce((acc, visit) => {
      if (!acc[visit.salesManId]) {
        acc[visit.salesManId] = [];
      }
      acc[visit.salesManId].push(visit);
      return acc;
    }, {} as Record<string, typeof visitedLocations>);

    console.log(`Total unique salesmen with visits: ${Object.keys(visitsBySalesman).length}`);

    // Transform the data into the required format
    const analytics: AnalyticsResponse[] = Object.entries(visitsBySalesman).map(([salesmanId, visits]) => {
      // Sort visits by creation time to determine in/out times
      const sortedVisits = visits.sort((a, b) =>
        a.createdAt.getTime() - b.createdAt.getTime()
      );

      const firstVisit = sortedVisits[0];
      const lastVisit = sortedVisits.length > 1 ? sortedVisits[sortedVisits.length - 1] : null;

      // Calculate accuracy percentage
      const accurateVisits = visits.filter(visit => visit.scanDistance < 100).length;
      const accuracyPercentage = (accurateVisits / visits.length) * 100;

      // Get unique locations visited by this salesman
      const uniqueLocationsVisited = new Set(visits.map(v => v.locationId)).size;

      // Get assigned locations count for this salesman
      const outletsAssigned = assignedLocationsMap.get(parseInt(salesmanId)) || 0;

      // Log cases where a salesman has visits but no assigned locations
      if (outletsAssigned === 0 && uniqueLocationsVisited > 0) {
        console.warn(
          `Warning: Salesman ${salesmanId} visited ${uniqueLocationsVisited} locations but has no assigned outlets.`
        );
      }

      if (firstVisit.Location.storeType !== "DISTRIBUTOR") {
        console.warn(
          `Salesman ${salesmanId} (${firstVisit.SalesMan.name}) visited a non-distributor location (${firstVisit.Location.storeType}).`
        );
      }


      return {
        state: firstVisit.Location.state,
        storeType: firstVisit.Location.storeType,
        salesmanName: firstVisit.SalesMan.name,
        salesmanType: firstVisit.SalesMan.salesManType,
        inTime: firstVisit.Location.storeType === "DISTRIBUTOR" ? firstVisit.createdAt.toISOString() : null,
        outTime: firstVisit.Location.storeType === "DISTRIBUTOR" && lastVisit 
          ? lastVisit.createdAt.toISOString() 
          : null,
        outletsVisited: uniqueLocationsVisited,
        outletsAssigned,
        accuracyPercentage: Math.round(accuracyPercentage),
      };
    });

    console.log(`Total updated analytics records generated: ${analytics.length}`);

    return res.status(200).json({
      success: true,
      data: analytics,
    });

  } catch (error) {
    console.error("Error fetching updated location analytics:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};



export const getLocationAnalyticsByDateRange = async (req: Request, res: Response) => {
  try {
    console.log("Fetching updated location analytics...");

    const { startDate, endDate, page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let dateFilter: any = {};
    if (startDate) {
      dateFilter.date = {
        gte: new Date(startDate as string),
      };
      if (endDate) {
        dateFilter.date.lte = new Date(endDate as string);
      }
    }

    // Get visited locations with related data
    const visitedLocations = await Prisma.visitedLocation.findMany({
      where: dateFilter,
      include: {
        Location: true,
        SalesMan: true,
      },
      orderBy: {
        createdAt: "asc",
      },
      skip,
      take: Number(limit),
    });

    console.log(`Total locations visited: ${visitedLocations.length}`);

    // Get assigned locations count for each salesman
    const assignedLocations = await Prisma.assignSalesman.groupBy({
      by: ["salesManId"],
      _count: {
        locationId: true,
      },
    });

    // Create a map for quick lookup of assigned locations count
    const assignedLocationsMap = new Map(
      assignedLocations.map((item) => [item.salesManId, item._count.locationId])
    );

    console.log(`Total unique salesmen with assigned locations: ${assignedLocations.length}`);

    // Group visits by salesman
    const visitsBySalesman = visitedLocations.reduce((acc, visit) => {
      if (!acc[visit.salesManId]) {
        acc[visit.salesManId] = [];
      }
      acc[visit.salesManId].push(visit);
      return acc;
    }, {} as Record<string, typeof visitedLocations>);

    console.log(`Total unique salesmen with visits: ${Object.keys(visitsBySalesman).length}`);

    // Transform the data into the required format
    const analytics = Object.entries(visitsBySalesman).map(([salesmanId, visits]) => {
      // Sort visits by creation time to determine in/out times
      const sortedVisits = visits.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

      const firstVisit = sortedVisits[0];
      const lastVisit = sortedVisits.length > 1 ? sortedVisits[sortedVisits.length - 1] : null;

      // Calculate accuracy percentage
      const accurateVisits = visits.filter(visit => visit.scanDistance < 100).length;
      const accuracyPercentage = (accurateVisits / visits.length) * 100;

      // Get unique locations visited by this salesman
      const uniqueLocationsVisited = new Set(visits.map(v => v.locationId)).size;

      // Get assigned locations count for this salesman
      const outletsAssigned = assignedLocationsMap.get(parseInt(salesmanId)) || 0;

      return {
        state: firstVisit.Location.state,
        storeType: firstVisit.Location.storeType,
        salesmanName: firstVisit.SalesMan.name,
        salesmanType: firstVisit.SalesMan.salesManType,
        inTime: firstVisit.Location.storeType === "DISTRIBUTOR" ? firstVisit.createdAt.toISOString() : null,
        outTime: firstVisit.Location.storeType === "DISTRIBUTOR" && lastVisit 
          ? lastVisit.createdAt.toISOString() 
          : null,
        outletsVisited: uniqueLocationsVisited,
        outletsAssigned,
        accuracyPercentage: Math.round(accuracyPercentage),
      };
    });

    console.log(`Total updated analytics records generated: ${analytics.length}`);

    return res.status(200).json({
      success: true,
      data: analytics,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        hasNextPage: visitedLocations.length === Number(limit),
      },
    });

  } catch (error) {
    console.error("Error fetching updated location analytics:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
  

export const getMostVisitedLocation = async (req: Request, res: Response) => {
    try {
        const location = await Prisma.visitedLocation.groupBy({
            by: ["locationId"],
            _count: { locationId: true },
            orderBy: { _count: { locationId: "desc" } },
            take: 1,  // Get only the most visited location
        });

        if (location.length === 0) {
            return res.json({ mostVisitedLocation: null });
        }

        const topLocation = location[0];

        // Fetch the location name for the most visited location
        const locationDetail = await Prisma.managedLocation.findUnique({
            where: { id: topLocation.locationId },
            select: { id: true, name: true },
        });

        const mostVisitedLocation = {
            locationId: topLocation.locationId,
            locationName: locationDetail?.name || "Unknown",
            visitCount: topLocation._count.locationId,
        };

        res.json({ mostVisitedLocation });

    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

  
  
  
  
  
  
  
  
  
  
  
  
