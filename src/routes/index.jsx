import {
  AdminAsideData,
  DoctorPanelData,
  PatientPanelData,
  ReceptionPanelData,
  StyleGuideAsideMenu,
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
  Manage,
  Create,
  EditDesignInvoice,
  FontFamily,
  Buttons,
} from "@/pages";
import { MonitorBilling } from "@/pages/Admin/MonitorBilling";
import { PatientManagement } from "@/pages/Admin/PatientManagement";
import { InsuranceClaims } from "@/pages/Admin/InsuranceClaims";
import { PaymentProcess } from "@/pages/Admin/PaymentProcess";
import { createBrowserRouter, NavLink } from "react-router-dom";
import { ProfileSetting } from "@/components/ProfileSetting";
import { AppointmentManagement } from "@/pages/Doctor/AppointmentManagement";
import { AppointmentSchedular } from "@/components/AppointmentSchedular";
import { AllModalTemplate } from "@/pages/Admin/AllModalTemplate";
import { Bill1, Bill2, Bill3 } from "@/components";
import NotificationBox from "@/components/NotificationBox";
import ProtectedRoute from "./ProtectedRoute";
import { PersonalHealthRecord } from "@/pages/Patients";

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
          element: (
            <ProtectedRoute>
              <AuthLayouts />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <PatientRegistration />,
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
          element: (
            <ProtectedRoute>
              <DashboardLayout items={AdminAsideData} />
            </ProtectedRoute>
          ),
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
                  element: <AddNewDoctor />,
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
                  element: <CreateBillForm />,
                },
                {
                  path: "edit-design-invoice",
                  element: <EditDesignInvoice />,
                },
                {
                  path: "bill-view",
                  element: <Bill3 />,
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

            // temp all-modal 

            {
              path: "all-modal",
              element: <AllModalTemplate />,
            },
          ],
        },
        /* Doctor */
        {
          path: "doctor",
          children: [
            {
              element: (
                <ProtectedRoute>
                  <DashboardLayout items={DoctorPanelData} />
                </ProtectedRoute>
              ),
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
                      element: <PatientViewDetails />,
                    },
                  ],
                },
                {
                  path: "notification-box",
                  element: <NotificationBox />
                },
                {
                  path: "create-prescriptionTools",
                  children: [
                    {
                      index: true,
                      path: "create",
                      element: <Create />,
                    },
                    {
                      path: "manage",
                      element: <Manage />,
                    },
                  ],
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
              element: (
                <ProtectedRoute>
                  <DashboardLayout items={PatientPanelData} />
                </ProtectedRoute>
              ),
              children: [
                {
                  index: true,
                  element: <PersonalHealthRecord />,
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
              ],
            },
          ],
        },
        /* Reception */
        {
          path: "reception",
          children: [
            {
              element: (
                <ProtectedRoute>
                  <DashboardLayout items={ReceptionPanelData} />
                </ProtectedRoute>
              ),
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
        /* StyleGuide */
        {
          path: "style-guide",
          element: <DashboardLayout items={StyleGuideAsideMenu} />,
          children: [
            {
              index: true,
              element: <FontFamily />,
            },
            {
              path: "button",
              element: <Buttons />,
            },
            {
              path: "input",
              // element: <Inputs />,
            },
            {
              path: "checkbox",
              // element: <CheckBox />,
            },
            {
              path: "modal",
              // element: <Modal />,
            },
            {
              path: "table",
              // element: "table",
            },
            {
              path: "icons",
              // element: <DSIcons />,
            },
            {
              path: "tabs",
              // element: <Tabs />,
            },
            {
              path: "tags",
              element: "tags",
            },
            {
              path: "cards",
              // element: <Cards />,
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
