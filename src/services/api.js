import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const apiService = {
  // Patient
  PatientLogin: (userData) => api.post("/patient/login", userData),
  PatientRegister: (userData) => api.post("/patient/register", userData),
  GetPatientProfile: (id) => api.get(`/patient/getPatient/${id}`),
  EditPatientProfile: (id, userData) =>
    api.put(`/patient/editPatient/${id}`, userData),
  GetAllPatients: () => api.get("/patient/getAllPatient"),
  GetPatientById: (id) => api.get(`/patient/getPatient/${id}`),

  // Admin
  AdminLogin: (userData) => api.post("/admin/login", userData),
  AdminRegister: (userData) => api.post("/admin/register", userData),
  GetAdminProfile: (id) => api.get(`/admin/profile/${id}`),
  EditAdminProfile: (id, userData) =>
    api.patch(`/admin/edit-profile/${id}`, userData),
  ChangePassword: (id, userData) =>
    api.patch(`/admin/change-password/${id}`, userData),

  // Doctor
  DoctorLogin: (userData) => api.post("/doctor/login", userData),
  DoctorRegister: (userData) => api.post("/doctor/register", userData),
  CreateDoctor: (userData) => api.post("/doctor/addDoctor", userData),
  GetAllDoctors: (userData) => api.get("/doctor/getAllDoctors", userData),
  GetDoctorById: (id) => api.get(`/doctor/getDoctorById/${id}`),
  EditDoctor: (id, userData) => api.put(`/doctor/editDoctor/${id}`, userData),
  DeleteDoctor: (id) => api.delete(`/doctor/deleteDoctor/${id}`),

  // Universal Login /logout
  UniversalLogin: (userData) => api.post("/login", userData),
  UniversalLogout: (userData) => api.post("/logout", userData),
  ForgetPassword: (userData) => api.post("/forgetPassword", userData),
  VerifyOtp: (userData) => api.post("/verifyOtp", userData),
  ResetPassword: (userData) => api.post("/resetPassword", userData),

  //Hospital
  CreateHospital: (userData) => api.post("/hospital/create-hospital", userData),
  GetAllHospitals: (userData) =>
    api.get("/hospital/get-all-hospitals", userData),

  // Bill
  GetBills: () => api.get("/bill/getbill"),
  GetBillsById: () => api.get("/bill/getbillsById"),
  GetInsuranceBills: () => api.get("/bill/getInsuranceBills"),
  CreateBill: (userData) => api.post("/bill/createbill", userData),
  GetBillById: (id) => api.get(`/bill/singlebill/${id}`),
  EditBill: (id, userData) => api.put(`/bill/billupdate/${id}`, userData),
  DeleteBill: (id) => api.delete(`/bill/deletebill/${id}`),
  GetAllHospital: (userData) =>
    api.post("/hospital/get-all-hospitals", userData),

  //Appointments
  GetallAppointmentsForCount: () =>
    api.get(`/appoinment/allAppointmentsForCount`),
  GetAllAppointments: () => api.get(`/appoinment/allappoinment`),
  GetAllTodayAppointments: () => api.get(`/appoinment/alltodayappoinment`),
  GetAppointmentById: (id) => api.get(`/appoinment/singleappointment/${id}`),
  GetALLAppointmentById: (patientId) =>
    api.get(`/appoinment/getAllAppointmentById/${patientId}`),
  EditAppointment: (id, userData) =>
    api.put(`/appoinment/updateappointment/${id}`, userData),
  DeleteAppointment: (id) => api.delete(`/appoinment/deleteappointment/${id}`),
  CancelAppointment: (appointmentId) =>
    api.put(`/appoinment/cancelappointment/${appointmentId}`),
  createAppointment: (id, userData) =>
    api.post(`/appoinment/appoinmentcreate`, userData),
  GetAppointsForDoctor: (doctorId) =>
    api.get(`/appoinment/Doctor_Appointment_History/${doctorId}`, doctorId),
  GetAppointsForPatient: (patientId) =>
    api.get(`/appoinment/Patient_Appointment_History/${patientId}`, patientId),
  AppointmentDone: (patientId) =>
    api.get(`/appoinment/appoinmentDone/${patientId}`),

  //Chats
  GetChatHistory: (doctorId, patientId) =>
    api.get(`/chat/${doctorId}/${patientId}`),
  GetDoctorContacts: (id) => api.get(`/chat/contacts/patient/${id}`),
  GetPatientContacts: (id) => api.get(`/chat/contacts/doctor/${id}`),
  GetReporingAndAnalytics: () =>
    api.get(`/aggregation/reporting-and-analytics`),

  //Payment
  AppointmentFee: (doctorId, appointmentType) =>
    api.get(
      `/appoinment/appointment-fee?doctorId=${doctorId}&appointmentType=${appointmentType}`,
    ),
  createRazorpayOrder: (data) =>
    api.post("/appoinment/create-razorpay-order", data),
  verifyPayment: (data) => api.post("/appoinment/verify-payment", data),
  createAppointmentWithPayment: (appointmentData) =>
    api.post("/appoinment/appoinmentcreate", appointmentData),

  //Prescription
  CreatePrescription: (userData, id) =>
    api.post(`/prescription/createprescription/${id}`, userData),
  GetAllPrescriptions: () => api.get(`/prescription/getPrescription`), ///temp getall prescription
  GetPrescriptionById: (id) =>
    api.get(`/prescription/getPrescriptionById/${id}`),
  EditPrescription: (id, userData) =>
    api.put(`/prescription/editprescription/${id}`, userData),
  DeletePrescription: (id) =>
    api.delete(`/prescription/deleteprescription/${id}`),

  // Unavailable Times
  GetUnavailableTimes: (doctorId) =>
    api.get(`/doctor/${doctorId}/unavailable-times`),
  AddUnavailableTime: (doctorId, data) =>
    api.post(`/doctor/${doctorId}/unavailable-times`, data),

  // Notification
  GetNotifications: (data) => api.post(`/notification/sendNotification`, data),
  GetUserNotifications: (userId) =>
    api.get(`/notification/getnotificationforuser/${userId}`),
  MarkNotificationAsRead: (notificationId) =>
    api.put(`/notification/markAsRead/${notificationId}`),
  MarkAllNotificationsAsRead: (userId) =>
    api.put(`/notification/markAllAsRead/${userId}`),
  DeleteNotification: (notificationId) =>
    api.delete(`/notification/deletenotification/${notificationId}`),

  // Token
  UpdateDoctorToken: (data) => api.post(`/notification/updateDoctor`, data),
  UpdatePatientToken: (data) => api.post(`/notification/updatePatient`, data),
};

export default apiService;
