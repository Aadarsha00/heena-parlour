/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../components/axios/api.axios";
import type {
  Service,
  ServiceCategory,
  ServicesResponse,
} from "../interface/services.interface";

// Get all services
export const getAllServices = async (): Promise<ServicesResponse> => {
  try {
    const response = await api.get("/services/");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Get all services with filters
export const getServicesWithFilters = async (params: {
  category?: ServiceCategory;
  is_active?: boolean;
}): Promise<ServicesResponse> => {
  try {
    const response = await api.get("/services/", { params });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Get service details by ID
export const getServiceById = async (id: number): Promise<Service> => {
  try {
    const response = await api.get(`/services/${id}/`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Get services by category (grouped)
export const getServicesByCategory = async (): Promise<any> => {
  try {
    const response = await api.get("/services/by_category/");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Category-specific service functions
export const getLashServices = async (): Promise<ServicesResponse> => {
  try {
    const response = await api.get("/services/", {
      params: { category: "lashes", is_active: true },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

export const getThreadingServices = async (): Promise<ServicesResponse> => {
  try {
    const response = await api.get("/services/", {
      params: { category: "threading", is_active: true },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

export const getPartyServices = async (): Promise<ServicesResponse> => {
  try {
    const response = await api.get("/services/", {
      params: { category: "party", is_active: true },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};

// Generic function for any category
export const getServicesBySpecificCategory = async (
  category: ServiceCategory
): Promise<ServicesResponse> => {
  try {
    const response = await api.get("/services/", {
      params: { category, is_active: true },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
};
