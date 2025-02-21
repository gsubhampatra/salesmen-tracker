import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DistributorDashboard from "./pages/DistributorDashboard";
import DeatiledAnalysis from "./pages/DeatiledAnalysis";
import SalesmanSummary from "./pages/SalesmanSummary";

Chart.register(...registerables);

const App: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Router>
      <div className="flex">
        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        <div
          className={`
            flex-1 p-4 transition-all duration-300
            ${isExpanded ? 'md:ml-64' : 'md:ml-20'}
          `}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/distributor" element={<DistributorDashboard />} />
            <Route path="/detailed-analysis" element={<DeatiledAnalysis />} />
            <Route path="/Salesman-Summary" element={<SalesmanSummary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
