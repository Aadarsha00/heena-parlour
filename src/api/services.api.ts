/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../components/axios/api.axios";

//get all services
export const getAllServices = async () => {
  try {
    const response = await api.get("/services/");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};
