import { lazy } from "react";

export const AdminPanel = lazy(() => import("./Admin/"));
export const DoctorPanel = lazy(() => import("./Doctor/"));
export const PatientPanel = lazy(() => import("./patient"));
export const ReceptionPanel = lazy(() => import("./Reception/"));
