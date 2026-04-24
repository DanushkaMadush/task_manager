import { api } from "../client";

export const getTasks = async (params: any) => {
  const res = await api.get('/tasks', { params });
  return res.data;
};

export const createTask = async (title: string) => {
  const res = await api.post('/tasks', { title });
  return res.data;
};

export const toggleTask = async (id: number) => {
  const res = await api.patch(`/tasks/${id}/toggle`);
  return res.data;
};