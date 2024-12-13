import { lazy } from "react";

export const AdminPanel = lazy(() => import("../pages/Admin/"));
export const DoctorPanel = lazy(() => import("../pages/Doctor/"));
export const PatientPanel = lazy(() => import("../pages/patient"));
export const RecaptionPanel = lazy(() => import("../pages/Reception/"));
