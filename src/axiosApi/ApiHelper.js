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
export const login = (data) => request("post", "/api/auth/login", data);
export const register = (data) => request("post", "/register", data);
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


