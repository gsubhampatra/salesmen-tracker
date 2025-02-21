import { Router } from "express";
const router = Router();
import ManagerAuthRoutes from "./admin/authRoutes";
import SalesManRoutes from "./admin/salesMenRoutes";
import LocationRoutes from "./admin/locationRoutes";
import UserAuthRoutes from "./user/authRoutes";
import UserLocationRoutes from "./user/locationRoutes";
import DashboardRoutes from "./dashboard/dashboardRoutes";
// admin routes
router.use("/admin", ManagerAuthRoutes);
router.use("/admin", SalesManRoutes);
router.use("/admin", LocationRoutes);

// user routes
router.use("/user", UserAuthRoutes);
router.use("/user", UserLocationRoutes);

//dashboard routes
router.use("/dashboard", DashboardRoutes);

export default router;
