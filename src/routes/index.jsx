import {
  AdminAsideData,
  DoctorPanelData,
  PatientPanelData,
  ReceptionPanelData,
} from "@/constants/data";
import { AuthLayouts, DashboardLayout } from "@/layouts";
import {
  DoctorManagement,
  ForgetPassword,
  Login,
  OTP,
  Register,
  ReceptionManagement,
  ResetPassword,
  AddNewDoctor,
  CreateBillForm,
  AdminDashboard,
  ReportingAnalytics,
  PatientRecordAccess,
  PatientViewDetails,
  Teleconsultation,
  AddNewReceptionist,
  PatientRegistration,
  ReceptionDashboard,
  Manage
} from "@/pages";
import { MonitorBilling } from "@/pages/Admin/MonitorBilling";
import { PatientManagement } from "@/pages/Admin/PatientManagement";
import { InsuranceClaims } from "@/pages/Admin/InsuranceClaims";
import { PaymentProcess } from "@/pages/Admin/PaymentProcess";
import { createBrowserRouter, NavLink } from "react-router-dom";
import { ProfileSetting } from "@/components/ProfileSetting";
import { AppointmentManagement } from "@/pages/Doctor/AppointmentManagement";
import { AllBillModel } from "@/pages/Patients/AllBillModal/AllBillModel";
import { AppointmentSchedular } from "@/components/AppointmentSchedular";

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
              element: <PatientRegistration />,
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
              element: <AdminDashboard />,
            },
            {
              path: "doctor-management",
              children: [
                {
                  index: true,
                  element: <DoctorManagement />,
                },
                {
                  path: "create",
                  element: <AddNewDoctor />
                },
                {
                  path: "edit/:id",
                  element: <AddNewDoctor />,
                },
              ],
            },
            {
              path: "patient-management",
              children: [
                {
                  index: true,
                  element: <PatientManagement />,
                },
                {
                  path: "create",
                  element: "<DoctorManagement />",
                },
                {
                  path: "edit",
                  element: "<DoctorManagement />",
                },
              ],
            },
            {
              path: "reception-management",
              children: [
                {
                  index: true,
                  element: <ReceptionManagement />,
                },
                {
                  path: "create",
                  element: <AddNewReceptionist />,
                },
                {
                  path: "edit",
                  element: "<DoctorManagement />",
                },
              ],
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
                  element: "<DoctorManagement />",
                },
                {
                  path: "edit-medical",
                  element: "<DoctorManagement />",
                },
              ],
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
              ],
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
              element: <ReportingAnalytics />,
            },
            {
              path: "profile",
              element: <ProfileSetting />,
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
                  element: <AppointmentManagement />,
                },
                {
                  path: "patientrecordaccess",
                  children: [
                    {
                      index: true,
                      element: <PatientRecordAccess />,
                    },
                    {
                      path: "patientviewdetails",
                      element: <PatientViewDetails />
                    }
                  ]
                },
                {
                  path: "create-prescriptionTools",
                  children: [
                    {
                      index: true,
                      element: "create",
                    },
                    {
                      path: "manage",
                      element: <Manage />
                    }
                  ]
                },
                {
                  path: "teleconsultation-module",
                  element: <Teleconsultation />,
                },
                {
                  path: "chat-screen",
                  element: "chatScreen",
                },
              ],
            },
          ],
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
                  element: "patient",
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
                  element: <AllBillModel />,
                },
              ],
            },
          ],
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
                  element: <ReceptionDashboard />,
                },
                {
                  path: "patient-registration",
                  element: <Register />,
                },
                {
                  path: "personal-health",
                  element: "personal-health",
                },
                {
                  path: "appointment",
                  element: <AppointmentSchedular />,
                },
                {
                  path: "monitor-billing",
                  element: "monitor-billing",
                },
              ],
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
