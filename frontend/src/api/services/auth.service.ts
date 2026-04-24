import { api } from "../client";

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};