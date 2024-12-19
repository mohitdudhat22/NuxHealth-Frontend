import { lazy } from "react";

/* Admin Components */
export const AdminPanel = lazy(() => import("./Admin/"));

/* Doctor Components */
export const DoctorPanel = lazy(() => import("./Doctor/"));

/* Patient Components */
export const PatientPanel = lazy(() => import("./patient"));
export const PatientRegistration = lazy(
  () => import("../pages/Auth/PatientRegistration/")
);

/* Reception Components */
export const ReceptionPanel = lazy(() => import("./Reception/"));
