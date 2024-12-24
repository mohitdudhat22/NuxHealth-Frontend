import { AdminAsideData } from "@/constants/data";
import { AuthLayouts, DashboardLayout } from "@/layouts";
import { DoctorManagement } from "@/layouts/DoctorManagement";
import { ForgetPassword, Login, OTP, Register, ResetPassword } from "@/pages";
import { Dashboard } from "@/pages/Admin/Dashboard";
import React from "react";
import { createBrowserRouter, NavLink } from "react-router-dom";

const NuxHealthRoute = createBrowserRouter(
  /* All Paths */
  [
    {
      path: "/",
      children: [
        {
          index: true,
          element: <NavLink to={"/login"}>Login</NavLink>,
        },
        {
          element: <AuthLayouts />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "forgot-password",
              element: <ForgetPassword />,
            },
            {
              path: "otp",
              element: <OTP />,
            },
            {
              path: "reset-password",
              element: <ResetPassword />,
            },
          ],
        },
        {
          path: "admin",
          children: [
            {
              element: <DashboardLayout items={AdminAsideData} />,
              children: [
                {
                  index: true,
                  element: "admin",
                },
                {
                  path: "doctor-management",
                  element: "/admin/doctor-management",
                },
                {
                  path: "patient-management",
                  element: "/admin/patient-management",
                },
                {
                  path: "monitor-billing",
                  children: [
                    {
                      index: true,
                      element: <MonitorBilling />,
                    },
                    {
                      path: "createbill",
                      element: "/monitor-billing/createbill",
                    },
                  ]
                },
                {
                  path: "insurance-claims",
                  element: "/admin/insurance-claims",
                },
                {
                  path: "payment-process",
                  element: "/admin/payment-process",
                },
                {
                  path: "reporting-analytics",
                  element: "/admin/reporting-analytics",
                },
              ]
            },
            {
              path: "doctor-management",
              element: <DoctorManagement />,
            },
            {
              path: "patient-management",
              element: "/admin/patient-management",
            },
            {
              path: "monitor-billing",
              element: "/admin/monitor-billing",
            },
            {
              path: "insurance-claims",
              element: "/admin/insurance-claims",
            },
            {
              path: "payment-process",
              element: "/admin/payment-process",
            },
            {
              path: "reporting-analytics",
              element: "/admin/reporting-analytics",
            },
          ]
        },
      ],
    },
    {
      /* Default Route (404) */
      path: "*",
      element: <>404 - Page Not Found</>,
    },
  ],
  {
    /* Base URL */
    basename: "/",
  }
);

export default NuxHealthRoute;
