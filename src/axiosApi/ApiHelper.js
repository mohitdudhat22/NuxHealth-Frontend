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
export const login = (data) => request("post", "/api/auth/login", data);
export const forgotPassword = (data) => request("post", "/api/auth/forgot-password", data);
export const verifyOtp = (data) => request("post", "/api/auth/verify-otp", data);
export const resetPassword = (data) => request("post", "/api/auth/reset-password", data);

/* Admin Register Form */
export const registerAdmin = (data) => request("post", "/api/registerAdmin", data);

/* Hospital Add And Get */

export const addHospitals = (data) => request("post", "/api/hospital/createHospital", data);
export const getHospitals = () => request("get", "/api/hospital/getHospitals");

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


