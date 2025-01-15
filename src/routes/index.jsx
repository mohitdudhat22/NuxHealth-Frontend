import {
  AdminAsideData,
  DoctorPanelData,
  PatientPanelData,
  ReceptionPanelData,
  StyleGuideAsideMenu,
} from "@/constants/data";
import { AuthLayouts, ChatLayout, DashboardLayout } from "@/layouts";
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
  AppoinmentManagement,
  AppointmentSchedularPage,
  PersonalHealthRecord,
  TeleconsultationAccess,
  AppointmentTimeSlot,
  DoctorMeetingConference,
  PrescriptionAccess,
  ReceptionBills,
} from "@/pages";
import { MonitorBilling } from "@/pages/Admin/BillingAndPayement/MonitorBilling";
import { PatientManagement } from "@/pages/Admin/PatientManagement";
import { InsuranceClaims } from "@/pages/Admin/BillingAndPayement/InsuranceClaims";
import { PaymentProcess } from "@/pages/Admin/BillingAndPayement/PaymentProcess";
import { createBrowserRouter, NavLink } from "react-router-dom";
import { ProfileSetting } from "@/components/ProfileSetting";
import { AppointmentManagement } from "@/pages/Doctor/AppointmentManagement";

import { AllModalTemplate } from "@/pages/Admin/AllModalTemplate";
import NotificationBox from "@/components/NotificationBox";
import ProtectedRoute from "./ProtectedRoute";
import { BillView } from "@/pages/Admin/BillingAndPayement/MonitorBilling/BillView";
import { PatientBills } from "@/pages/Patients/PatientsBills";
import { AppointmentBooking } from "@/pages/Patients/AppointmentBooking";
import { ChatTempComponentforDoctor } from "@/components/ChatTempComponentforDoctor";
import { ChatTempComponentforPatient } from "@/components/ChatTempComponentforPatient";
import { ChatLayoutForDoctor } from "@/components/ChatLayoutForDoctor";
import { ChatLayoutForPatient } from "@/components/ChatLayoutForPatients";
import { PatientMettingConference } from "@/pages/Patients";
import { PatientHealthRecord } from "@/pages/Reception/PatientHealthRecord";
import { PatientHelthDetails } from "@/pages/Reception/PatientHealthRecord/PatientHealthDetails";
import { InsuranceBillView } from "@/pages/Admin/BillingAndPayement/InsuranceClaims/InsuranceBillView";
import {CreateBill} from "@/components/CreateBill";
import { PaymentBillView } from "@/pages/Admin/BillingAndPayement/PaymentProcess/PaymentBillView";
import { NHCard } from "@/components";
import { PatientBillView } from "@/pages/Patients/PatientsBills/BillView";

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

        /*temp*/
        {
          path: "tempDoctor",
          element: <ChatTempComponentforDoctor />,
        },
        {
          path: "tempPatient",
          element: <ChatTempComponentforPatient />,
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
                  path: "bill-view/:billId",
                  element: <BillView />,
                },
              ],
            },
            {
              path: "insurance-claims",
              children: [
                {
                  index: true,
                  element: <InsuranceClaims />,
                },
                {
                  path: "insurance-bill-view/:billId",
                  element: <InsuranceBillView />,
                },
              ],
            },
            {
              path: "payment-process",
              children: [
                {
                  index: true,
                  element: <PaymentProcess />,
                },
                {
                  path: "edit-bill",
                  element: <CreateBill />,
                },
                {
                  path: "bill-view/:id",
                  element: <PaymentBillView />,
                },
              ],
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
                      path: "patientviewdetails/:id",
                      element: <PatientViewDetails />,
                    },
                  ],
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
                  children: [
                    {
                      index: true,
                      element: <Teleconsultation />,
                    },
                    {
                      path: "videoCall",
                      element: <DoctorMeetingConference />,
                    },
                  ],
                },
                {
                  path: "chat-doctor",
                  element: <ChatLayoutForDoctor />,
                },
                {
                  path: "chat-screen",
                  element: <ChatLayoutForDoctor />,
                  children: [
                    {
                      index: true,
                      element: <Login />,
                    },
                  ],
                },
                {
                  path: "profile",
                  element: <ProfileSetting />,
                }
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
                  children: [
                    {
                      index: true,
                      element: <AppointmentBooking />,
                    },
                    {
                      path: "scheduler",
                      element: <AppointmentSchedularPage />,
                    },
                    {
                      path: "reschedule",
                      element: <AppointmentTimeSlot />,
                    },
                  ],
                },
                {
                  path: "prescription-access",
                  element: <PrescriptionAccess />,
                },
                {
                  path: "teleconsultation",
                  children: [
                    {
                      index: true,
                      element: <TeleconsultationAccess />,
                    },
                    {
                      path: "videoCall",
                      element: <PatientMettingConference />,
                    },
                  ],
                },
                {
                  path: "chat-patient",
                  element: <ChatLayoutForPatient />,
                },
                {
                  path: "chat-screen",
                  element: <ChatLayoutForPatient />,
                },
                {
                  path: "bills",
                  children: [
                    {
                      index: true,
                      element: <PatientBills />,
                    },
                    {
                      path: "bill-view",
                      element: <PatientBillView />,
                    },
                  ],
                },
                {
                  path: "profile",
                  element: <ProfileSetting />,
                }
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
                  element: (
                    <NHCard className="p-4">
                      <PatientRegistration />
                    </NHCard>
                  ),
                },
                {
                  path: "patient-Login",
                  element: (
                    <NHCard className="p-4">
                      {" "}
                      <Login />
                    </NHCard>
                  ),
                },
                {
                  path: "personal-health",
                  children: [
                    {
                      index: true,
                      element: <PatientHealthRecord />,
                    },
                    {
                      path: "view-patient/:id",
                      element: <PatientHelthDetails />,
                    },
                  ],
                },
                {
                  path: "appointment",
                  // element: <AppointmentBooking />,
                  children: [
                    {
                      index: true,
                      // element: <AppoinmentManagement />,
                      element: <AppointmentBooking />,
                    },
                    {
                      path: "scheduler",
                      element: <AppointmentSchedularPage />,
                    },
                    {
                      path: "reschedule",
                      element: <AppointmentTimeSlot />,
                    },
                  ],
                },
                {
                  path: "bills",
                  element: <ReceptionBills />,
                },
                {
                  path: "bill-view/:billId",
                  element: <BillView />,
                },
                {
                  path: "profile",
                  element: <ProfileSetting />,
                }
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
