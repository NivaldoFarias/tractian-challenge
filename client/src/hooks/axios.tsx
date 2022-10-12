import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

const routes = (route: string) => {
  return {
    create: () => `/${route}/create`,
    searchAll: (queries: string) => `/${route}/search${queries ? `?${queries}` : ""}`,
    searchById: (id: string) => `/${route}/search/${id}`,
    update: (id: string) => `/${route}/update/${id}`,
    delete: (id: string) => `/${route}/delete/${id}`,
  };
};

export { Axios, routes };
