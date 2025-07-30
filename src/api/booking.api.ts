/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "../components/axios/api.axios";

// Appointment API functions
export const createAppointment = async (appointmentData: {
  client_name: string;
  client_email: string;
  client_phone: string;
  service: number;
  stylist: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}) => {
  try {
    const response = await api.post("/appointments/", appointmentData);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to create appointment";
  }
};

export const getAppointmentDetails = async (appointmentId: number) => {
  try {
    const response = await api.get(`/appointments/${appointmentId}/`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to get appointment details";
  }
};

export const cancelAppointment = async (appointmentId: number) => {
  try {
    const response = await api.post(`/appointments/${appointmentId}/cancel/`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data?.message || "Failed to cancel appointment";
  }
};

export const getMyUpcomingAppointments = async () => {
  try {
    const response = await api.get("/appointments/my_upcoming/");
    return response.data;
  } catch (error: any) {
    throw (
      error?.response?.data?.message || "Failed to get upcoming appointments"
    );
  }
};
