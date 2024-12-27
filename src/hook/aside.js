import { useEffect, useState } from "react";
import { useLocation, matchPath } from "react-router-dom";

export const useAside = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState();

  useEffect(() => {
    const path = location.pathname;

    if (path === "/") {
      setCurrentPage("/");
    } else if (path === "/admin") {
      setCurrentPage("/admin");
    } else if (path === "/admin/doctor-management") {
      setCurrentPage("doctorManagement");
    } else if (path === "/admin/doctor-management/create") {
      setCurrentPage("doctorManagement");
    } else if (matchPath("/admin/doctor-management/edit/:id", path)) {
      setCurrentPage("doctorManagement");
    } else if (path === "/admin/patient-management") {
      setCurrentPage("patientManagement");
    } else if (path === "/admin/reception-management") {
      setCurrentPage("receptionManagement");
    } else if (path === "/admin/reception-management/create") {
      setCurrentPage("receptionManagement");
    } else if (path === "/admin/medical-management") {
      setCurrentPage("medicalManagement");
    } else if (path === "/admin/monitor-billing") {
      setCurrentPage("monitorBilling");
    } else if (path === "/admin/insurance-claims") {
      setCurrentPage("insuranceClaims");
    } else if (path === "/admin/payment-process") {
      setCurrentPage("paymentProcess");
    } else if (path === "/admin/reporting-analytics") {
      setCurrentPage("reportingAnalytics");
    } else if (path === "/doctor") {
      setCurrentPage("/doctor");
    } else if (path === "/doctor/patientrecordaccesst") {
      setCurrentPage("patientRecordAccess");
    } else if (path === "/doctor/createPrescriptionTools") {
      setCurrentPage("createPrescriptionTools");
    } else if (path === "/doctor/teleconsultationModule") {
      setCurrentPage("teleConsultationModule");
    } else if (path === "/doctor/chatScreen") {
      setCurrentPage("chatScreen");
    } else if (path === "/patient") {
      setCurrentPage("/patient");
    } else if (path === "/patient/appointment") {
      setCurrentPage("appointment");
    } else if (path === "/patient/prescriptionaccess") {
      setCurrentPage("prescriptionAccess");
    } else if (path === "/patient/teleconsultation") {
      setCurrentPage("teleConsultation");
    } else if (path === "/patient/chatScreen") {
      setCurrentPage("chatScreen");
    } else if (path === "/patient/bills") {
      setCurrentPage("bills");
    } else if (path === "/reception") {
      setCurrentPage("/reception");
    } else if (path === "/reception/patient-registration") {
      setCurrentPage("patientRegistration");
    } else if (path === "/reception/personalhealth") {
      setCurrentPage("personalHealth");
    } else if (path === "/reception/appointment") {
      setCurrentPage("appointment");
    } else if (path === "/reception/monitorBilling") {
      setCurrentPage("monitorBilling");
    } else {
      setCurrentPage(path);
    }
  }, [location.pathname]);

  return { currentPage };
};
