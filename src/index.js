import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import TimedGraph from "./pages/TimedGraph.jsx";
import NonTimed from "./pages/NonTimed.jsx";
import RiskAnalysis from "./pages/RiskAnalysis.jsx";
import Others from "./pages/Others.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/TimedGraph",
        element: <TimedGraph />,
      },
      {
        path: "/NonTimed",
        element: <NonTimed />,
      },
      {
        path: "/RiskAnalysis",
        element: <RiskAnalysis />,
      },
      {
        path: "/Others",
        element: <Others />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);