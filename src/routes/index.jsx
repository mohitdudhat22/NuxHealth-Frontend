import React from "react";
import { AdminAsideData } from "@/constants/data";
import { AuthLayouts, DashboardLayout } from "@/layouts";
import { ForgetPassword, Login, OTP, Register, ResetPassword } from "@/pages";
import { MonitorBilling } from "@/pages/Admin/MonitorBilling";
import { PatientManagement } from "@/pages/Admin/PatientManagement";
import { InsuranceClaims } from "@/pages/Admin/InsuranceClaims";
import { PaymentProcess } from "@/pages/Admin/PaymentProcess";
import CreateBill from "@/pages/CreateBill";
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
                  element: <PatientManagement />,
                },
                {
                  path: "monitor-billing",
                  children: [
                    {
                      index: true,
                      element: <MonitorBilling />,
                    },
                    {
                      path: "create-bill",
                      element: <CreateBill />
                    },
                  ]
                },
                {
                  path: "insurance-claims",
                  element: <InsuranceClaims />,
                },
                {
                  path: "payment-process",
                  element: <PaymentProcess />,
                },
                {
                  path: "reporting-analytics",
                  element: "/admin/reporting-analytics",
                },
              ]
            },
            {
              element: <AuthLayouts />,
              children: [
                {
                  path: "register",
                  element: <Register />,
                },
              ],
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
