import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}/tasks`);
  return res.data;
};

export const createTask = async (title: string) => {
  const res = await axios.post(`${API_URL}/tasks`, { title });
  return res.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};


export const updateTask = async (id: number, title: string) => {
  const res = await axios.put(`${API_URL}/tasks/${id}`, { title });
  return res.data;
};
