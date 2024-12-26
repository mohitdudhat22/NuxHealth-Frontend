import { AdminAsideData, DoctorPanelData, PatientPanelData, ReceptionPanelData } from "@/constants/data";
import { AuthLayouts, DashboardLayout } from "@/layouts";
import { AddNewDoctor, CreateBillForm, DoctorManagement, ForgetPassword, Login, OTP, Register, ResetPassword } from "@/pages";
import { MonitorBilling } from "@/pages/Admin/MonitorBilling";
import { PatientManagement } from "@/pages/Admin/PatientManagement";
import { InsuranceClaims } from "@/pages/Admin/InsuranceClaims";
import { PaymentProcess } from "@/pages/Admin/PaymentProcess";
import { createBrowserRouter, NavLink } from "react-router-dom";
const NuxHealthRoute = createBrowserRouter(
  /* All Paths */
  [
    {
      path: "/",
      children: [
        /* Website */
        {
          index: true,
          element: <NavLink to={"/login"}>Login</NavLink>,
        },
        /* AuthCation */
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
            {
              path: "admin/register",
              element: <Register />,
            },
          ],
        },
        /* Admin */
        {
          path: "admin",
          element: <DashboardLayout items={AdminAsideData} />,
          children: [
            {
              index: true,
              element: "admin",
            },
            {
              path: "doctor-management",
              children: [
                {
                  index: true,
                  element: <DoctorManagement />,
                },
                {
                  path: "doctor-management",
                  children: [
                    {
                      index: true,
                      element: <DoctorManagement />,
                    },
                    {
                      path: "create-doctor",
                      element: <AddNewDoctor />
                    },
                    {
                      path: "edit-doctor",
                      element: "<DoctorManagement />"
                    }
                  ]
                },
                {
                  path: "edit-doctor",
                  element: "<DoctorManagement />"
                }
              ]
            },
            {
              path: "patient-management",
              children: [
                {
                  index: true,
                  element: <PatientManagement />,
                },
                {
                  path: "create-patient",
                  element: "<DoctorManagement />"
                },
                {
                  path: "edit-patient",
                  element: "<DoctorManagement />"
                }
              ]
            },
            {
              path: "reception-management",
              children: [
                {
                  index: true,
                  element: <PatientManagement />,
                },
                {
                  path: "create-reception",
                  element: "<DoctorManagement />"
                },
                {
                  path: "edit-reception",
                  element: "<DoctorManagement />"
                }
              ]
            },
            {
              path: "medical-management",
              children: [
                {
                  index: true,
                  element: <PatientManagement />,
                },
                {
                  path: "create-medical",
                  element: "<DoctorManagement />"
                },
                {
                  path: "edit-medical",
                  element: "<DoctorManagement />"
                }
              ]
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
                  element: <CreateBillForm />
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
          ],
        },
        /* Doctor */
        {
          path: "doctor",
          children: [
            {
              element: <DashboardLayout items={DoctorPanelData} />,
              children: [
                {
                  index: true,
                  element: "doctor"
                },
                {
                  path: "patientrecordaccess",
                  element: "patientrecordaccess"
                },
                {
                  path: "create-prescriptionTools",
                  element: "create-prescriptionTools"
                },
                {
                  path: "teleconsultation-module",
                  element: "teleconsultation-module"
                },
                {
                  path: "chat-screen",
                  element: "chatScreen"
                }
              ]
            }
          ]
        },
        /* Patient */
        {
          path: "patient",
          children: [
            {
              element: <DashboardLayout items={PatientPanelData} />,
              children: [
                {
                  index: true,
                  element: "patient"
                },
                {
                  path: "appointment",
                  element: "appointment",
                },
                {
                  path: "prescription-access",
                  element: "prescription-access",
                },
                {
                  path: "teleconsultation",
                  element: "teleconsultation",
                },
                {
                  path: "chat-screen",
                  element: "chat-screen",
                },
                {
                  path: "bills",
                  element: "bills",
                },
              ]
            }
          ]
        },
        /* Reception */
        {
          path: "reception",
          children: [
            {
              element: <DashboardLayout items={ReceptionPanelData} />,
              children: [
                {
                  index: true,
                  element: "reception"
                },
                {
                  path: "patient-registration",
                  element: "patient-registration"
                },
                {
                  path: "personal-health",
                  element: "personal-health"
                },
                {
                  path: "appointment",
                  element: "appointmenton"
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
                      element: <CreateBillForm />
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
              ],
            },
            {
              element: <AuthLayouts />,
              children: [
                {
                  path: "register",
                  element: <Register />,
                },
              ]
            }
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
