import { Response, Request } from "express";
import { Prisma } from "../../lib/prisma/prismaClinet";



export async function getLocationAnalytic(req: Request, res: Response) {
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
                    address: location.address || "N/A", // Include Address
                    salesmanType: assignments.length > 0 ? assignments[0].SalesMan.salesManType : "N/A",
                    inTime: null,
                    outTime: null,
                    outletsVisited: 0,
                    outletsAssigned: assignments.length,
                    accuracyPercentage: 0,
                    accuracyDistance: null, // No visits, so no accuracy distance
                    visited: "No", // No visits, so "No"
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

            // Calculate average accuracy distance
            const totalDistance = visits.reduce((sum, visit) => sum + visit.scanDistance, 0);
            const accuracyDistance = visits.length > 0 ? (totalDistance / visits.length).toFixed(2) : null; // in meters

            return {
                storeType: location.storeType, // Added store type field
                region: location.region || "N/A",
                state: location.state || "N/A",
                address: location.address || "N/A", // Include Address
                salesmanType: visits[0]?.SalesMan?.salesManType || "N/A",
                inTime: Math.round(inTime.getHours() * 60 + inTime.getMinutes()),
                outTime: outTime ? Math.round(outTime.getHours() * 60 + outTime.getMinutes()) : null,
                outletsVisited,
                outletsAssigned,
                accuracyPercentage: Math.round(accuracyPercentage * 100) / 100,
                accuracyDistance, // Added accuracy distance in meters
                visited: outletsVisited > 0 ? "Yes" : "No", // If at least one visit, mark as "Yes"
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


