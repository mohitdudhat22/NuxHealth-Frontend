import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAside = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    switch (location.pathname) {
      // Website
      case "/":
        setCurrentPage("/");
        break;
      // Admin
      case "/admin":
        setCurrentPage("/admin");
        break;
      case "/admin/doctor-management":
        setCurrentPage("doctorManagement");
        break;
      case "/admin/patient-management":
        setCurrentPage("patientManagement");
        break;
      case "/admin/reception-management":
        setCurrentPage("receptionManagement");
        break;
      case "/admin/medical-management":
        setCurrentPage("medicalManagement");
        break;
      case "/admin/monitor-billing":
        setCurrentPage("monitorBilling");
        break;
      case "/admin/insurance-claims":
        setCurrentPage("insuranceClaims");
        break;
      case "/admin/payment-process":
        setCurrentPage("paymentProcess");
        break;
      case "/admin/reporting-analytics":
        setCurrentPage("reportingAnalytics");
        break;
      // Doctor
      case "/doctor":
        setCurrentPage("/doctor");
        break;
      case "/doctor/patientrecordaccesst":
        setCurrentPage("patientRecordAccess");
        break;
      case "/doctor/createPrescriptionTools":
        setCurrentPage("createPrescriptionTools");
        break;
      case "/doctor/teleconsultationModule":
        setCurrentPage("teleConsultationModule");
        break;
      case "/doctor/chatScreen":
        setCurrentPage("chatScreen");
        break;
      // Patient
      case "/patient":
        setCurrentPage("/patient");
        break;
      case "/patient/appointment":
        setCurrentPage("appointment");
        break;
      case "/patient/prescriptionaccess":
        setCurrentPage("prescriptionAccess");
        break;
      case "/patient/teleconsultation":
        setCurrentPage("teleConsultation");
        break;
      case "/patient/chatScreen":
        setCurrentPage("chatScreen");
        break;
      case "/patient/bills":
        setCurrentPage("bills");
        break;
      // Reception
      case "/reception":
        setCurrentPage("/reception");
        break;
      case "/reception/patient-registration":
        setCurrentPage("patientRegistration");
        break;
      case "/reception/personalhealth":
        setCurrentPage("personalHealth");
        break;
      case "/reception/appointment":
        setCurrentPage("appointment");
        break;
      case "/reception/monitorBilling":
        setCurrentPage("monitorBilling");
        break;
      default:
        setCurrentPage(location.pathname);
    }
  }, [location.pathname]);

  return { currentPage };
};