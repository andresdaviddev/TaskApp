import axios from "./axios";

export const addTaskRequest = async (values) => {
  const response = await axios.post("/tasks", values);
  return response;
};

export const getTasksrequest = async () => {
  const response = await axios.get("/tasks");
  return response.data;
};

export const getTaskRequest = async (id) => {
  const response = await axios.get(`tasks/${id}`);
  return response;
};

export const deleteTaskRequest = async (id) => {
  const response = await axios.delete(`/tasks/${id}`);
  return response;
};

export const updateTaskRequest = async (id, values) => {
  const response = await axios.put(`tasks/${id}`, values);
  return response;
};
