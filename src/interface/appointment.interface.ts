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

export interface UpdateAppointmentData {
  appointment_date?: string;
  appointment_time?: string;
  notes?: string;
}

export interface AppointmentFilters {
  status?: "booked" | "confirmed" | "completed" | "cancelled" | "no_show";
  payment_status?: "pending" | "paid" | "refunded";
  appointment_date?: string;
  service?: number;
  stylist?: number;
}
