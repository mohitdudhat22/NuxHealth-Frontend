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

/* API Demo */
// export const postDemo = (data) => request("post", "/api/demo", data);
// export const getDemo = () => request("get", "/api/demo");
// export const putDemo = (data) => request("put", "/api/demo", data);
// export const deleteDemo = () => request("delete", "/api/demo");

/* Authentication */
// export const register = (data) => request("post", "/register", data);
export const login = (data) => request("post", "/api/auth/login", data);
export const forgotPassword = (data) => request("post", "/api/auth/forgot-password", data);
export const verifyOtp = (data) => request("post", "/api/auth/verify-otp", data);
export const resetPassword = (data) => request("post", "/api/auth/reset-password", data);

/* Delete Data */
export const DeleteData = (url) => request("delete", `/api/${url}`);

/* Admin Register Form */
export const registerAdmin = (data) => request("post", "/api/registerAdmin", data);

/* Hospital Add And Get */
export const addHospitals = (data) => request("post", "/api/hospital/createHospital", data);
export const getHospitals = () => request("get", "/api/hospital/getHospitals");

/* Admin */
export const adminDoctor = () => request("get", "/api/admin/getDoctor");
export const adminPatient = () => request("get", "/api/admin/getPatient");
export const adminReceptionist = () => request("get", "/api/admin/getReceptionist");
export const createDoctor = (data) => request("post", "/api/admin/createDoctor", data);
export const editDoctor = (id, data) => request("post", `/api/admin/editDoctor/${id}`, data);
export const createReceptionist = (data) => request("post", "/api/admin/createReceptionist", data);

/* Reception */

/* Doctor */

/* Patient */

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