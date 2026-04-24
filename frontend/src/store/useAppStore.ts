import { create } from "zustand";
import { login as loginApi } from "../api/services/auth.service";

type Filter = "all" | "completed" | "pending";

interface AppState {
  token: string | null;
  loading: boolean;
  error: string | null;
  tasks: any[];
  filter: Filter;

  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  toggleTask: (id: number) => Promise<void>;
  setFilter: (filter: Filter) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  tasks: [],
  filter: "all",

  login: async (username, password) => {
    set({ loading: true, error: null });

    try {
      const res = await loginApi({ username, password });

      const token = res.accessToken;

      localStorage.setItem("token", token);

      set({ token, loading: false });

      return true;
    } catch (err: any) {
      set({
        error: "Invalid credentials",
        loading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },

  fetchTasks: async () => {},
  addTask: async () => {},
  toggleTask: async () => {},
  setFilter: (filter) => set({ filter }),
}));
