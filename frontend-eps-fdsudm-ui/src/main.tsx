import React from "react";
import { createRoot } from "react-dom/client";
import "./tracking.js"
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import './styles/_styles.css';
import './index.css';
import "@emorg-prd/standard-react/css/em-standard.min.css";

const router: any = createRouter({ routeTree })

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "contact-us",
//         element: <ContactUs />,
//       },
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
