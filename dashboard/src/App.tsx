import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import SalesmanList from "./pages/Salesman/SalesmanList";
// import VisitReport from "./pages/Visits/VisitReport";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/salesman" element={<SalesmanList />} />
        {/* <Route path="/visits" element={<VisitReport />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
