import { Response, Request } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";

export async function getDistributors(req: Request, res: Response) {
    try {
      // Fetch all distributor-type managed locations
      const distributors = await Prisma.managedLocation.findMany({
        where: {
          storeType: 'DISTRIBUTOR'
        },
        include: {
          Manager: {
            select: {
              id: true,
              name: true,
              email: true
            }
          },
          VisitedLocation: {
            include: {
              SalesMan: {
                select: {
                  id: true,
                  name: true,
                  salesManType: true
                }
              }
            }
          },
          AssignSalesman: {
            include: {
              SalesMan: {
                select: {
                  id: true,
                  name: true,
                  salesManType: true
                }
              }
            }
          }
        }
      });
  
      res.json({
        success: true,
        total: distributors.length,
        data: distributors
      });
  
    } catch (error) {
      console.error('Error fetching distributor locations:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch distributor locations',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
export async function getDistributorAnalytics(req: Request, res: Response) {
    try {
      const date = req.query.date ? new Date(req.query.date as string) : new Date();
  
      // Get start and end of the queried date
      const startDate = new Date(date.setHours(0, 0, 0, 0));
      const endDate = new Date(date.setHours(23, 59, 59, 999));
  
      // Fetch all distributor locations
      const distributors = await Prisma.managedLocation.findMany({
        where: {
          storeType: "DISTRIBUTOR",
        },
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
              date: "asc", // Sorting by time for in-time & out-time calculation
            },
          },
          AssignSalesman: {
            include: {
              SalesMan: true,
            },
          },
        },
      });
  
      const analytics = distributors.map((location) => {
        const visits = location.VisitedLocation;
        const assignments = location.AssignSalesman;
  
        // If no visits, return basic data with default values
        if (visits.length === 0) {
          return {
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
  
        // In-Time (min) - Earliest visit time
        const inTime = visits[0].date;
  
        // Out-Time (max) - Latest visit time (if multiple records exist)
        const outTime = visits.length > 1 ? visits[visits.length - 1].date : null;
  
        // No. of Outlets Visited
        const outletsVisited = visits.length;
  
        // No. of Outlets Assigned
        const outletsAssigned = assignments.length;
  
        // Accuracy Calculation (Over 100m non-accurate)
        const accurateVisits = visits.filter((visit) => visit.scanDistance <= 100).length;
        const accuracyPercentage = (accurateVisits / visits.length) * 100;
  
        return {
          region: location.region || "N/A",
          state: location.state || "N/A",
          salesmanType: visits[0].SalesMan.salesManType,
          inTime: Math.round((inTime.getHours() * 60) + inTime.getMinutes()), // Convert time to minutes
          outTime: outTime ? Math.round((outTime.getHours() * 60) + outTime.getMinutes()) : null, // Convert if exists
          outletsVisited,
          outletsAssigned,
          accuracyPercentage: Math.round(accuracyPercentage * 100) / 100, // Round to 2 decimals
          locationName: location.name,
          marketName: location.market_name,
          salesmanName: visits[0].SalesMan.name, // First salesman's name
        };
      });
  
      res.json({
        success: true,
        data: analytics,
        debug: {
          dateQueried: date,
          totalDistributors: distributors.length,
          distributorsWithVisits: analytics.filter((a) => a.outletsVisited > 0).length,
        },
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

export const getTotalDistributors = async (req: Request, res: Response) => {
    try {
      const count = await Prisma.managedLocation.count({
        where: { storeType: "DISTRIBUTOR" },
      });
  
      res.json({ success: true, totalDistributors: count });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };
  
export const getTotalOutletsAssigned = async (req: Request, res: Response) => {
    try {
      const total = await Prisma.assignSalesman.count({
        where: {
          Location: { storeType: "DISTRIBUTOR" },
        },
      });
  
      res.json({ success: true, totalOutletsAssigned: total });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getTotalOutletsVisited = async (req: Request, res: Response) => {
    try {
      const total = await Prisma.visitedLocation.count({
        where: {
          Location: { storeType: "DISTRIBUTOR" },
        },
      });
  
      res.json({ success: true, totalOutletsVisited: total });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getOverallAccuracyPercentage = async (
    req: Request,
    res: Response
  ) => {
    try {
      const visitedLocations = await Prisma.visitedLocation.findMany({
        where: {
          Location: { storeType: "DISTRIBUTOR" },
        },
        include: { Location: true },
      });
  
      const totalVisits = visitedLocations.length;
      const accurateVisits = visitedLocations.filter((visit) => {
        const distance = calculateDistance(
          visit.UserLatitude,
          visit.UserLongitude,
          visit.Location.latitude,
          visit.Location.longitude
        );
        return distance <= 100; // 100 meters threshold
      }).length;
  
      const accuracyPercentage =
        totalVisits > 0 ? (accurateVisits / totalVisits) * 100 : 0;
      
      res.json({ success: true, overallAccuracy: accuracyPercentage.toFixed(2) });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getAverageVisitDuration = async (req: Request, res: Response) => {
    try {
      const visitedLocations = await Prisma.visitedLocation.findMany({
        where: { Location: { storeType: "DISTRIBUTOR" } },
        orderBy: { date: "asc" },
      });
  
      let totalDuration = 0;
      let count = 0;
  
      visitedLocations.forEach((visit, index) => {
        if (index > 0) {
          const prevVisit = visitedLocations[index - 1];
          const duration =
            (new Date(visit.date).getTime() - new Date(prevVisit.date).getTime()) /
            (1000 * 60);
          totalDuration += duration;
          count++;
        }
      });
  
      const avgDuration = count > 0 ? totalDuration / count : 0;
  
      res.json({ success: true, avgVisitDuration: avgDuration.toFixed(2) });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getMaxDistanceTraveled = async (req: Request, res: Response) => {
    try {
      const visitedLocations = await Prisma.visitedLocation.findMany({
        where: { Location: { storeType: "DISTRIBUTOR" } },
      });
  
      let maxDistance = 0;
      let currentDistance = 0;
  
      visitedLocations.forEach((visit, index) => {
        if (index > 0) {
          const prevVisit = visitedLocations[index - 1];
          currentDistance += calculateDistance(
            prevVisit.UserLatitude,
            prevVisit.UserLongitude,
            visit.UserLatitude,
            visit.UserLongitude
          );
        }
        maxDistance = Math.max(maxDistance, currentDistance);
      });
  
      res.json({ success: true, maxDistanceTraveled: maxDistance.toFixed(2) });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getUniqueSalesmen = async (req: Request, res: Response) => {
    try {
      const uniqueSalesmen = await Prisma.salesMan.count({
        where: {
          AssignSalesman: {
            some: {
              Location: { storeType: "DISTRIBUTOR" },
            },
          },
        },
      });
  
      res.json({ success: true, totalSalesmen: uniqueSalesmen });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getVisitsPerDistributor = async (req: Request, res: Response) => {
    try {
      const visits = await Prisma.managedLocation.findMany({
        where: { storeType: "DISTRIBUTOR" },
        include: {
          VisitedLocation: true,
        },
      });
  
      const visitsData = visits.map((dist) => ({
        locationName: dist.name,
        totalVisits: dist.VisitedLocation.length,
      }));
  
      res.json({ success: true, visitsPerDistributor: visitsData });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getMostActiveSalesman = async (req: Request, res: Response) => {
    try {
      const salesmanStats = await Prisma.salesMan.findMany({
        include: {
          visitedLocations: true,
        },
      });
  
      const mostActive = salesmanStats.sort(
        (a, b) => b.visitedLocations.length - a.visitedLocations.length
      )[0];
  
      res.json({
        success: true,
        mostActiveSalesman: mostActive
          ? { name: mostActive.name, totalVisits: mostActive.visitedLocations.length }
          : null,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getDistributorsWithNoVisits = async (
    req: Request,
    res: Response
  ) => {
    try {
      const distributors = await Prisma.managedLocation.count({
        where: {
          storeType: "DISTRIBUTOR",
          VisitedLocation: { none: {} },
        },
      });
  
      res.json({ success: true, distributorsWithNoVisits: distributors });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  }
  
export const getPeakVisitingHours = async (req: Request, res: Response) => {
    try {
      const visits = await Prisma.visitedLocation.findMany({
        where: { Location: { storeType: "DISTRIBUTOR" } },
        select: { date: true },
      });
  
      // Group visits by hour
      const hourlyVisits: Record<string, number> = {};
  
      visits.forEach((visit) => {
        const hour = new Date(visit.date).getHours();
        hourlyVisits[hour] = (hourlyVisits[hour] || 0) + 1;
      });
  
      const sortedHours = Object.keys(hourlyVisits).map((hour) => ({
        hour: `${hour}:00 - ${+hour + 1}:00`,
        visits: hourlyVisits[hour],
      }));
  
      res.json({ success: true, peakVisitingHours: sortedHours });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getSalesmanAccuracy = async (req: Request, res: Response) => {
    try {
      const salesmen = await Prisma.salesMan.findMany({
        include: {
          visitedLocations: {
            include: { Location: true },
          },
        },
      });
  
      const salesmanAccuracy = salesmen.map((salesman) => {
        const totalVisits = salesman.visitedLocations.length;
        const accurateVisits = salesman.visitedLocations.filter((visit) => {
          const distance = calculateDistance(
            visit.UserLatitude,
            visit.UserLongitude,
            visit.Location.latitude,
            visit.Location.longitude
          );
          return distance <= 100; // 100 meters threshold
        }).length;
  
        return {
          salesmanName: salesman.name,
          accuracyPercentage: totalVisits > 0 ? (accurateVisits / totalVisits) * 100 : 0,
        };
      });
  
      res.json({ success: true, salesmanAccuracy });
    } catch (error) {
      res.status(500).json({ success: false, error: "Failed to fetch data" });
    }
  };

export const getAccuracyOverTime = async (req:Request, res:Response) => {
    try {
      const data = await Prisma.visitedLocation.groupBy({
        by: ["date"],
        _count: {
          id: true, // Total visits per day
        },
        _sum: {
          scanDistance: true, // Sum of distances per day
        },
        orderBy: {
          date: "asc", // Ensures results are sorted from earliest to latest
        },
      });
  
      const formattedData = data.map((entry) => {
        const totalVisits = entry._count.id;
        const accurateVisits = entry._sum.scanDistance
          ? entry._sum.scanDistance / 100 <= totalVisits // Count visits within 100m
          : 0;
  
        return {
          date: entry.date,
          accuracy: (Number(accurateVisits) / Number(totalVisits)) * 100,
        };
      });
  
      res.json(formattedData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching accuracy over time" });
    }
  };

export const getSalesmanProductivity = async (req: Request, res: Response) => {
    try {
      const data = await Prisma.visitedLocation.groupBy({
        by: ["date", "salesManId"],
        _count: {
          id: true, // Count visits per salesman per day
        },
        orderBy: {
          date: "asc", // Ensures results are sorted from earliest to latest
        },
      });
  
      const formattedData = await Promise.all(
        data.map(async (entry) => {
          const salesman = await Prisma.salesMan.findUnique({
            where: { id: entry.salesManId },
            select: { name: true },
          });
  
          return {
            date: entry.date,
            salesman: salesman ? salesman.name : "Unknown",
            visits: entry._count.id,
          };
        })
      );
  
      res.json(formattedData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching salesman productivity" });
    }
  };

export const getAverageVisitDurationOverTime = async (req: Request, res: Response) => {
    try {
      const visits = await Prisma.visitedLocation.findMany({
        orderBy: { createdAt: "asc" }, // Sort visits by time
      });
  
      const durations: { [key: string]: { inTime: Date; outTime: Date } } = {};
  
      visits.forEach((visit) => {
        const date = visit.createdAt.toISOString().split("T")[0];
  
        if (!durations[date]) {
          durations[date] = { inTime: visit.createdAt, outTime: visit.createdAt };
        } else {
          durations[date].outTime = visit.createdAt; // Update out-time if a later visit is found
        }
      });
  
      const formattedData = Object.entries(durations).map(([date, times]) => {
        const duration =
          (new Date(times.outTime).getTime() - new Date(times.inTime).getTime()) / (1000 * 60); // Convert to minutes
  
        return { date, avgDuration: duration };
      });
  
      res.json(formattedData);
    } catch (error) {
      res.status(500).json({ error: "Error fetching visit durations" });
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  