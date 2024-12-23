import { AuthLayouts } from "@/layouts";
import { ForgetPassword, Login, OTP, ResetPassword } from "@/pages";
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
          // element: <NavLink to={"/login"}>Login</NavLink>,
        },
        {
          path: "admin",
          element: "admin",
        },
        {
          element: <AuthLayouts />,
          children: [
            {
              path: "login",
              element: <Login />,
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
