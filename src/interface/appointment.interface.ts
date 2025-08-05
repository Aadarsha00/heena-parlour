// Main Appointment interface (what you get from API responses)
export interface Appointment {
  id: number;
  client_name: string;
  client_email: string;
  client_phone: string;
  service: number;
  stylist: number;
  appointment_date: string; // "2024-07-30"
  appointment_time: string; // "14:30:00" (24-hour format)
  notes?: string;
  status: "booked" | "confirmed" | "completed" | "cancelled" | "no_show";
  payment_status: "pending" | "paid" | "refunded";
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// For creating new appointments
export interface CreateAppointmentData {
  client_name: string;
  client_email: string;
  client_phone: string;
  service: number;
  stylist: number;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
}

// For updating existing appointments
export interface UpdateAppointmentData {
  appointment_date?: string;
  appointment_time?: string;
  notes?: string;
  status?: "booked" | "confirmed" | "completed" | "cancelled" | "no_show";
  payment_status?: "pending" | "paid" | "refunded";
}

// For filtering appointments
export interface AppointmentFilters {
  status?: "booked" | "confirmed" | "completed" | "cancelled" | "no_show";
  payment_status?: "pending" | "paid" | "refunded";
  appointment_date?: string;
  service?: number;
  stylist?: number;
}

// API Response types
export interface AppointmentListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Appointment[];
}

export interface AppointmentResponse {
  appointment: Appointment;
  message?: string;
}
