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
  
      const accuracyPercentage: number =
        totalVisits > 0 ? ((totalVisits - inaccurateVisits) / totalVisits) * 100 : 0;
  
      res.json({ accuracyPercentage: accuracyPercentage.toFixed(2) });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export const getPeakVisitingHour = async (req: Request, res: Response) => {
    try {
      const visits = await Prisma.visitedLocation.findMany({ select: { date: true } });
      const hourCounts: number[] = Array(24).fill(0);
  
      visits.forEach((visit) => {
        const hour: number = new Date(visit.date).getHours();
        hourCounts[hour]++;
      });
  
      res.json({ peakHours: hourCounts });
    } catch (error) {
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
  

export const getAverageVisitDurations = async (req: Request, res: Response) => {
    try {
      const visits = await Prisma.visitedLocation.findMany({
        select: { createdAt: true, updatedAt: true },
      });
  
      let totalDuration: number = 0;
      let count: number = 0;
  
      visits.forEach((visit) => {
        const duration: number =
          new Date(visit.updatedAt).getTime() - new Date(visit.createdAt).getTime();
        totalDuration += duration;
        count++;
      });
  
      const averageDuration: number = count > 0 ? totalDuration / count / 60000 : 0;
  
      res.json({ averageVisitDuration: averageDuration.toFixed(2) });
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
      const count = await Prisma.visitedLocation.groupBy({
        by: ["locationId"],
        _count: { locationId: true },
      });
      res.json({ totalOutletsVisited: count.length });
      res.json({ totalOutletsVisited: count });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };

export async function getLocationAnalytics(req: Request, res: Response) {
    try {
      const date = req.query.date ? new Date(req.query.date as string) : new Date();
  
      // Get start and end of the queried date
      const startDate = new Date(date.setHours(0, 0, 0, 0));
      const endDate = new Date(date.setHours(23, 59, 59, 999));
  
      // Fetch all managed locations (not just distributors)
      const locations = await Prisma.managedLocation.findMany({
        include: {
          VisitedLocation: {
            where: {
              date: {
                gte: startDate,
                lte: endDate,
              },
            },
            include: {
              SalesMan: true,
            },
            orderBy: {
              date: "asc",
            },
          },
          AssignSalesman: {
            include: {
              SalesMan: true,
            },
          },
        },
      });
  
      const analytics = locations.map((location) => {
        const visits = location.VisitedLocation;
        const assignments = location.AssignSalesman;
  
        // If no visits, return default values
        if (visits.length === 0) {
          return {
            storeType: location.storeType,
            region: location.region || "N/A",
            state: location.state || "N/A",
            salesmanType: assignments.length > 0 ? assignments[0].SalesMan.salesManType : "N/A",
            inTime: null,
            outTime: null,
            outletsVisited: 0,
            outletsAssigned: assignments.length,
            accuracyPercentage: 0,
            locationName: location.name,
            marketName: location.market_name,
            salesmanName: assignments.length > 0 ? assignments[0].SalesMan.name : "N/A",
          };
        }
  
        // In-Time (earliest visit)
        const inTime = visits[0].date;
  
        // Out-Time (latest visit)
        const outTime = visits.length > 1 ? visits[visits.length - 1].date : null;
  
        // Number of outlets visited
        const outletsVisited = visits.length;
  
        // Number of outlets assigned
        const outletsAssigned = assignments.length;
  
        // Accuracy Calculation (Over 100m non-accurate)
        const accurateVisits = visits.filter((visit) => visit.scanDistance <= 100).length;
        const accuracyPercentage = (accurateVisits / visits.length) * 100;
  
        return {
          storeType: location.storeType, // Added store type field
          region: location.region || "N/A",
          state: location.state || "N/A",
          salesmanType: visits[0]?.SalesMan?.salesManType || "N/A",
          inTime: Math.round(inTime.getHours() * 60 + inTime.getMinutes()),
          outTime: outTime ? Math.round(outTime.getHours() * 60 + outTime.getMinutes()) : null,
          outletsVisited,
          outletsAssigned,
          accuracyPercentage: Math.round(accuracyPercentage * 100) / 100,
          locationName: location.name,
          marketName: location.market_name,
          salesmanName: visits[0]?.SalesMan?.name || "N/A",
        };
      });
  
      res.json({
        success: true,
        data: analytics,
        debug: {
          dateQueried: date,
          totalLocations: locations.length,
          locationsWithVisits: analytics.filter((a) => a.outletsVisited > 0).length,
        },
      });
  
    } catch (error) {
      console.error("Error fetching location analytics:", error);
      res.status(500).json({
        success: false,
        error: "Failed to fetch location analytics",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

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

  
  
  
  
  
  
  
  
  
  
  
  
