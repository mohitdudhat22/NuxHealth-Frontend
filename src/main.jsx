import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { DoctorProvider } from "./context/DoctorContext.jsx";
import { PatientProvider } from "./context/PatientContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./context/ErrorBoundary.jsx";
import { ToasterProvider } from "./providers/Toaster.jsx";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GlobalProvider>
      <AuthProvider>
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <PatientProvider>
              <DoctorProvider>
                <AdminProvider>
                  <App />
                  <ToasterProvider />
                </AdminProvider>
              </DoctorProvider>
            </PatientProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </AuthProvider>
    </GlobalProvider>
  </BrowserRouter>
);
