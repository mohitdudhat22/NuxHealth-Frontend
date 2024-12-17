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
// export const register = (data) =>
//   request("post", "/society-handler/create", data);

export const register = (data) => request("post", "/register", data);
export const login = (data) => request("post", "/login", data);
