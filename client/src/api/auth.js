import axios from "./axios.js";

export const registerRequest = async (values) => {
  const response = await axios.post(`/register`, values);
  return response;
};

export const loginRequest = async (values) => {
  const response = await axios.post(`/login`, values);
  return response;
};

export const verifyTokenRequest = async (values) => {
  const response = await axios.get("/verify-token", values);
  return response;
};

export const logOutRequest = async ()=>{
  const response = await axios.post("/logout");
  return response;
}