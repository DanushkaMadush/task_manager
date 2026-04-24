import { create } from "zustand";
import { login as loginApi } from "../api/services/auth.service";
import {
  getTasks as getTasksApi,
  createTask as createTaskApi,
  toggleTask as toggleTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../api/services/task.service";

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
  updateTask: (id: number, title: string) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
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

  fetchTasks: async () => {
    const { filter } = get();
    set({ loading: true });

    try {
      const data = await getTasksApi({ page: 1, limit: 10, status: filter });

      set({ tasks: data, loading: false });
    } catch (err) {
      set({ loading: false, error: "Failed to fetch tasks" });
    }
  },

  addTask: async (title: string) => {
    await createTaskApi(title);
    await get().fetchTasks();
  },

  toggleTask: async (id: number) => {
    await toggleTaskApi(id);
    await get().fetchTasks();
  },

  setFilter: async (filter) => {
    set({ filter });
    await get().fetchTasks();
  },

  updateTask: async (id: number, title: string) => {
    await updateTaskApi(id, title);
    await get().fetchTasks();
  },

  deleteTask: async (id: number) => {
    await deleteTaskApi(id);
    await get().fetchTasks();
  },

}));
