import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import DistributorDashboard from "./pages/DistributorDashboard";
import DeatiledAnalysis from "./pages/DeatiledAnalysis";
import SalesmanSummary from "./pages/SalesmanSummary";
import AdminLogin from "./pages/LoginPage";

Chart.register(...registerables);

const App: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="flex">
        {isAuthenticated && (
          <Sidebar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            setIsAuthenticated={setIsAuthenticated}
          />
        )}
        <div
          className={`
            flex-1 transition-all duration-300
            ${isAuthenticated ? (isExpanded ? "md:ml-64" : "md:ml-20") : ""}
          `}
        >
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/distributor"
              element={
                isAuthenticated ? (
                  <DistributorDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/detailed-analysis"
              element={
                isAuthenticated ? (
                  <DeatiledAnalysis />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/Salesman-Summary"
              element={
                isAuthenticated ? <SalesmanSummary /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
