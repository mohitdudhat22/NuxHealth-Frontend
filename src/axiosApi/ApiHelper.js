import { axiosApi } from "@/axiosApi";

async function request(method, url, data) {
  try {
    const response = await axiosApi[method](`${url}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} request to ${url}:`, error);
    throw error;
  }
}

/* Authentication */
// export const register = (data) => request("post", "/register", data);
// export const login = (data) => request("post", "/login", data);

// Reception
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



// Bill API:

// Create Bill: /receptionist/createbill
// Get Bill: /receptionist/getbill
// logged in User Bill: /receptionist/getbillsById
// Get Insurance Bill: /receptionist/getInsuranceBills
// View Single Bill: /receptionist/singlebill
// Update Bill: /receptionist/billupdate
// Delete Bill: /receptionist/deletebill

// Patient
export const PatientLogin = (userData) =>
  request("post", "/patient/login", userData);
export const RegisterPatient = (userData) =>
  request("post", "/patient/register", userData);
export const GetPatientProfile = (id) =>
  request("get", `/patient/getPatient/${id}`);
export const EditPatientProfile = (id, userData) =>
  request("put", `/patient/editPatient/${id}`, userData);
export const GetAllPatients = () => request("get", "/patient/getAllPatient");
export const GetPatientById = (id) =>
  request("get", `/patient/getPatient/${id}`);

// Admin
export const AdminLogin = (userData) =>
  request("post", "/admin/login", userData);
export const RegisterAdmin = (userData) =>
  request("post", "/admin/register", userData);
export const GetAdminProfile = (id) => request("get", `/admin/profile/${id}`);
export const EditAdminProfile = (id, userData) =>
  request("patch", `/admin/edit-profile/${id}`, userData);
export const ChangePassword = (id, userData) =>
  request("patch", `/admin/change-password/${id}`, userData);

// Doctor
export const DoctorLogin = (userData) =>
  request("post", "/doctor/login", userData);
export const DoctorRegister = (userData) =>
  request("post", "/doctor/register", userData);
export const CreateDoctor = (userData) =>
  request("post", "/doctor/addDoctor", userData);
export const GetAllDoctors = () => request("get", "/doctor/getAllDoctors");
export const GetDoctorById = (id) =>
  request("get", `/doctor/getDoctorById/${id}`);
export const EditDoctor = (id, userData) =>
  request("put", `/doctor/editDoctor/${id}`, userData);
export const DeleteDoctor = (id) =>
  request("delete", `/doctor/deleteDoctor/${id}`);

// Universal Login /logout
export const Login = (userData) => request("post", "/login", userData);
export const Logout = (userData) =>
  request("post", "/logout", userData);
export const ForgetPassword = (userData) =>
  request("post", "/forgetPassword", userData);
export const VerifyOtp = (userData) => request("post", "/verifyOtp", userData);
export const ResetPassword = (userData) =>
  request("post", "/resetPassword", userData);

// Hospital
export const CreateHospital = (userData) =>
  request("post", "/hospital/create-hospital", userData);
export const GetAllHospitals = () =>
  request("get", "/hospital/get-all-hospitals");

// Bill
export const GetBills = () => request("get", "/bill/getbill");
export const GetBillsById = () => request("get", "/bill/getbillsById");
export const GetInsuranceBills = () =>
  request("get", "/bill/getInsuranceBills");
export const CreateBill = (userData) =>
  request("post", "/bill/createbill", userData);
export const GetBillById = (id) => request("get", `/bill/singlebill/${id}`);
export const EditBill = (id, userData) =>
  request("put", `/bill/billupdate/${id}`, userData);
export const DeleteBill = (id) => request("delete", `/bill/deletebill/${id}`);
export const GetAllHospital = (userData) =>
  request("post", "/hospital/get-all-hospitals", userData);

// Appointments
export const GetallAppointmentsForCount = () =>
  request("get", `/appoinment/allAppointmentsForCount`);
export const GetAllAppointments = () =>
  request("get", `/appoinment/allappoinment`);
export const GetAllTodayAppointments = () =>
  request("get", `/appoinment/alltodayappoinment`);
export const GetAppointmentById = (id) =>
  request("get", `/appoinment/singleappointment/${id}`);
export const GetALLAppointmentById = (patientId) =>
  request("get", `/appoinment/getAllAppointmentById/${patientId}`);
export const EditAppointment = (id, userData) =>
  request("put", `/appoinment/updateappointment/${id}`, userData);
export const DeleteAppointment = (id) =>
  request("delete", `/appoinment/deleteappointment/${id}`);
export const CancelAppointment = (appointmentId) =>
  request("put", `/appoinment/cancelappointment/${appointmentId}`);
export const createAppointment = (userData) =>
  request("post", `/appoinment/appoinmentcreate`, userData);
export const GetAppointsForDoctor = (doctorId) =>
  request("get", `/appoinment/Doctor_Appointment_History/${doctorId}`);
export const GetAppointsForPatient = (patientId) =>
  request("get", `/appoinment/Patient_Appointment_History/${patientId}`);
export const AppointmentDone = (patientId) =>
  request("get", `/appoinment/appoinmentDone/${patientId}`);

// Chats
export const GetChatHistory = (doctorId, patientId) =>
  request("get", `/chat/${doctorId}/${patientId}`);
export const GetDoctorContacts = (id) =>
  request("get", `/chat/contacts/patient/${id}`);
export const GetPatientContacts = (id) =>
  request("get", `/chat/contacts/doctor/${id}`);
export const GetReporingAndAnalytics = () =>
  request("get", `/aggregation/reporting-and-analytics`);

// Payment
export const AppointmentFee = (doctorId, appointmentType) =>
  request(
    "get",
    `/appoinment/appointment-fee?doctorId=${doctorId}&appointmentType=${appointmentType}`
  );
export const createRazorpayOrder = (data) =>
  request("post", "/appoinment/create-razorpay-order", data);
export const verifyPayment = (data) =>
  request("post", "/appoinment/verify-payment", data);
export const createAppointmentWithPayment = (appointmentData) =>
  request("post", "/appoinment/appoinmentcreate", appointmentData);

// Prescription
export const CreatePrescription = (userData, id) =>
  request("post", `/prescription/createprescription/${id}`, userData);
export const GetAllPrescriptions = () =>
  request("get", `/prescription/getPrescription`);
export const GetPrescriptionById = (id) =>
  request("get", `/prescription/getPrescriptionById/${id}`);
export const EditPrescription = (id, userData) =>
  request("put", `/prescription/editprescription/${id}`, userData);
export const DeletePrescription = (id) =>
  request("delete", `/prescription/deleteprescription/${id}`);

// Unavailable Times
export const GetUnavailableTimes = (doctorId) =>
  request("get", `/doctor/${doctorId}/unavailable-times`);
export const AddUnavailableTime = (doctorId, data) =>
  request("post", `/doctor/${doctorId}/unavailable-times`, data);

// Notification
export const GetNotifications = (data) =>
  request("post", `/notification/sendNotification`, data);
export const GetUserNotifications = (userId) =>
  request("get", `/notification/getnotificationforuser/${userId}`);
export const MarkNotificationAsRead = (notificationId) =>
  request("put", `/notification/markAsRead/${notificationId}`);
export const MarkAllNotificationsAsRead = (userId) =>
  request("put", `/notification/markAllAsRead/${userId}`);
export const DeleteNotification = (notificationId) =>
  request("delete", `/notification/deletenotification/${notificationId}`);

// Token
export const UpdateDoctorToken = (data) =>
  request("post", `/notification/updateDoctor`, data);
export const UpdatePatientToken = (data) =>
  request("post", `/notification/updatePatient`, data);