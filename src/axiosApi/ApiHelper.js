import { axiosApi } from "@/axiosApi";

async function request(method, url, data) {
  try {
    const response = await axiosApi[method](`${url}`, data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} request to ${url}:`, error);
    throw error;
  }
}

/* API Demo */
// export const postDemo = (data) => request("post", "/api/demo", data);
// export const getDemo = () => request("get", "/api/demo");
// export const putDemo = (data) => request("put", "/api/demo", data);
// export const deleteDemo = () => request("delete", "/api/demo");

/* Authentication */
// export const register = (data) => request("post", "/register", data);
export const login = (data) => request("post", "/api/auth/login", data);
export const forgotPassword = (data) =>
  request("post", "/api/auth/forgot-password", data);
export const verifyOtp = (data) =>
  request("post", "/api/auth/verify-otp", data);
export const resetPassword = (data) =>
  request("post", "/api/auth/reset-password", data);

/* Delete Data */
export const DeleteData = (url) => request("delete", `/api/${url}`);

/* Admin Register Form */
export const registerAdmin = (data) =>
  request("post", "/api/registerAdmin", data);

/* Hospital Add And Get */
export const addHospitals = (data) =>
  request("post", "/api/hospital/createHospital", data);
export const getHospitals = () => request("get", "/api/hospital/getHospitals");

/* Admin */
export const adminDoctor = () => request("get", "/api/admin/getDoctor");
export const adminPatient = () => request("get", "/api/admin/getPatient");
export const adminReceptionist = () =>
  request("get", "/api/admin/getReceptionist");
export const createDoctor = (data) =>
  request("post", "/api/admin/createDoctor", data);
export const editDoctor = (id, data) =>
  request("post", `/api/admin/editDoctor/${id}`, data);
export const createReceptionist = (data) =>
  request("post", "/api/admin/createReceptionist", data);

/* Reception */

/* Doctor */
export const todayAppointment = () =>
  request("get", "/api/doctor/getAppointment?filter=today");

/* Patient */
export const patientDashboard = () =>
  request("get", "/api/patient/getDashboardData");

/* Reception */
export const CreateReception = (data) =>
  request("post", `/receptionist/register`, data);
export const ListReception = () =>
  request("get", `/receptionist/getReceptionist`);
export const ViewReception = (id) =>
  request("get", `/receptionist/getReceptionist/${id}`);
export const EditReception = (id) =>
  request("get", `/receptionist/getReceptionist/${id}`);
export const UpdateReception = (id, data) =>
  request("put", `/receptionist/updateReceptionist/${id}`, data);
export const DeleteReception = (id) =>
  request("delete", `/receptionist/deleteReceptionist/${id}`);
export const ReceptionistCreateBill = () =>
  request("post", `/receptionist/createbill`);
export const ReceptionistGetBill = () =>
  request("get", `/receptionist/getbill/`);
export const ReceptionistSingleBill = (id) =>
  request("get", `/receptionist/singlebill/${id}`);

//priyanka //admin
export const getDashboardAndReport = () =>
  request("get", "/api/admin/getDashboardDataDemo");
export const getbill = () => request("get", "/api/admin/getBillsMonitor");
export const getInsuranceClaimBills = () =>
  request("get", "/api/admin/getBillsMonitor?type=Insurance");
export const getReportandAnalytics = () =>
  request("get", "/api/admin/reportandanalysis");
export const getbillbyNo = (id) =>
  request("get", `/api/admin/getBill?id=${id}`);
export const todaysAppointment = () =>
  request("get", "/api/admin/getAppointment?filter=today");
export const upcomingAppointment = () =>
  request("get", "/api/admin/getAppointment?filter=upcoming");
export const previousAppointment = () =>
  request("get", "/api/admin/getAppointment?filter=previous");
export const cancelAppointment = () =>
  request("get", "/api/admin/getAppointment?filter=cancel");
export const getPatientRecordAccess = () =>
  request("get", "/api/doctor/getPatientRecord");
export const getSinglePatient = (id) =>
  request("get", `/api/doctor/getsinglepatientrecord/${id}`);
export const todaysAppointmentForPatient = () =>
  request("get", "/api/patient/getAppointment?filter=today");
export const upcomingAppointmentForPatient = () =>
  request("get", "/api/patient/getAppointment?filter=upcoming");
export const previousAppointmentForPatient = () =>
  request("get", "/api/patient/getAppointment?filter=previous");
export const cancelAppointmentForPatient = () =>
  request("get", "/api/patient/getAppointment?filter=cancel");
export const getPaidBills = () =>
  request("get", "/api/patient/getBillsforPatient?status=paid");
export const getUnpaidBills = () =>
  request("get", "/api/patient/getBillsforPatient?status=unpaid");
export const todayManagePriscription = () =>
  request("get", "/api/doctor/getPrescription?dateFilter=today");
export const olderManagePriscription = () =>
  request("get", "/api/doctor/getPrescription?dateFilter=older");


export const getSinglePatientForAdmin = (id) => request("get", `/api/admin/getpatient?${id}`);
export const getSinglePatientForDoctor = (id) => request("get", `/api/doctor/getpatient?${id}`);
export const todaysAppointments = () => request("get", "/api/doctor/getAppointment?filter=today");
export const upcomingAppointments = () => request("get", "/api/doctor/getAppointment?filter=upcoming");
export const previousAppointments = () => request("get", "/api/doctor/getAppointment?filter=previous");
export const cancelAppointments = () => request("get", "/api/doctor/getAppointment?filter=cancel");
