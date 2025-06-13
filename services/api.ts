import { ListResponse } from "@/types";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export const groceryApi = {
  getItems: async (): Promise<ListResponse[]> => {
    const response = await api.get("/lists");
    return response.data;
  },

  getItemById: async (id: string): Promise<ListResponse> => {
    const response = await api.get(`/lists/${id}`);
    return response.data;
  },

  addItem: async (item: object) => {
    const response = await api.post("/lists", {
      ...item,
      id: Date.now().toString(),
    });
    return response.data;
  },

  updateItem: async (id: string, updates: object) => {
    const response = await api.put(`/lists/${id}`, updates);
    return response.data;
  },

  deleteItem: async (id: string) => {
    await api.delete(`/lists/${id}`);
    return id;
  },
};

export default api;
