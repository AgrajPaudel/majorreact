import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TimedGraph from "../pages/TimedGraph";
import NonTimed from "../pages/NonTimed";
import Homepage from "../pages/Homepage";
import RiskAnalysis from "../pages/RiskAnalysis";
import Others from "../pages/Others";

function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage></Homepage>}></Route>
          <Route path="TimedGraph" element={<TimedGraph></TimedGraph>}></Route>
          <Route path="NonTimed" element={<NonTimed></NonTimed>}></Route>
          <Route
            path="RiskAnalysis"
            element={<RiskAnalysis></RiskAnalysis>}
          ></Route>
          <Route path="Others" element={<Others></Others>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
