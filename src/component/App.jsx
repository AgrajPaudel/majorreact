import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer.jsx";
import NavBar from "./TestNavBar.jsx";
import { Chart as CharJS } from "chart.js/auto";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;