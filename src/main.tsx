import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import { CheckboxRepro, checkboxAction } from "./repro";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CheckboxRepro />,
    action: checkboxAction,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
