import React from "react";
import { RouterProvider } from "react-router-dom";
import { NHLoader } from "./components/NHLoader";
import NuxHealthRoute from "./routes";
import { Suspense } from "react";
import "./assets/css/style.css";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <>
      <Suspense fallback={<NHLoader />}>
        <RouterProvider router={NuxHealthRoute} />
      </Suspense>
    </>
  );
}

export default App;
