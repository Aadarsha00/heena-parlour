/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { XCircle, RefreshCw, Calendar } from "lucide-react";
import type { Appointment } from "../../interface/appointment.interface";
import {
  cancelAppointment,
  getAppointments,
  getMyUpcomingAppointments,
  getPaymentPendingAppointments,
} from "../../api/appointment.api";
import AppointmentStats from "./Stats";
import AppointmentFilters from "./Filter";
import AppointmentCard from "./Card";

// Types for filter states
export type FilterType =
  | "all"
  | "upcoming"
  | "payment_pending"
  | "confirmed"
  | "cancelled";

export interface AppointmentStats {
  total: number;
  upcoming: number;
  paymentPending: number;
  confirmed: number;
  cancelled: number;
}

const AppointmentDashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [, setSelectedAppointment] = useState<Appointment | null>(null);
  const queryClient = useQueryClient();

  // Fetch all appointments
  const {
    data: allAppointmentsResponse,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointments", "all"],
    queryFn: () => getAppointments(),
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch upcoming appointments
  const { data: upcomingAppointmentsResponse } = useQuery({
    queryKey: ["appointments", "upcoming"],
    queryFn: getMyUpcomingAppointments,
  });

  // Fetch payment pending appointments
  const { data: paymentPendingAppointmentsResponse } = useQuery({
    queryKey: ["appointments", "payment_pending"],
    queryFn: getPaymentPendingAppointments,
  });

  // Extract arrays from API responses
  const allAppointments = Array.isArray(allAppointmentsResponse)
    ? allAppointmentsResponse
    : allAppointmentsResponse?.results || [];

  const upcomingAppointments = Array.isArray(upcomingAppointmentsResponse)
    ? upcomingAppointmentsResponse
    : upcomingAppointmentsResponse?.results || [];

  const paymentPendingAppointments = Array.isArray(
    paymentPendingAppointmentsResponse
  )
    ? paymentPendingAppointmentsResponse
    : paymentPendingAppointmentsResponse?.results || [];

  // Cancel appointment mutation
  const cancelMutation = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      // Invalidate and refetch appointment data
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
    onError: (error) => {
      alert(`Failed to cancel appointment: ${error}`);
    },
  });

  // Filter appointments based on active filter
  const getFilteredAppointments = (): Appointment[] => {
    switch (activeFilter) {
      case "upcoming":
        return upcomingAppointments;
      case "payment_pending":
        return paymentPendingAppointments;
      case "confirmed":
        return allAppointments.filter(
          (apt: any) =>
            apt.status === "confirmed" && apt.payment_status === "paid"
        );
      case "cancelled":
        return allAppointments.filter((apt: any) => apt.status === "cancelled");
      default:
        return allAppointments;
    }
  };

  // Calculate stats
  const stats: AppointmentStats = {
    total: allAppointments.length,
    upcoming: upcomingAppointments.length,
    paymentPending: paymentPendingAppointments.length,
    confirmed: allAppointments.filter(
      (apt: any) => apt.status === "confirmed" && apt.payment_status === "paid"
    ).length,
    cancelled: allAppointments.filter((apt: any) => apt.status === "cancelled")
      .length,
  };

  const filteredAppointments = getFilteredAppointments();

  const handleCancelAppointment = (appointmentId: number) => {
    cancelMutation.mutate(appointmentId);
  };

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    // TODO: Open modal or navigate to details page
    console.log("View details for appointment:", appointment);
  };

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <XCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading appointments
                </h3>
                <p className="mt-2 text-sm text-red-700">{error.toString()}</p>
                <button
                  onClick={handleRefresh}
                  className="mt-3 bg-red-100 px-3 py-2 rounded-md text-sm text-red-800 hover:bg-red-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Appointments
            </h1>
            <p className="text-gray-600">
              Manage your upcoming appointments and payments
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <AppointmentStats stats={stats} />

        {/* Filters */}
        <AppointmentFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Appointments List */}
        {!isLoading && (
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No appointments found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {activeFilter === "all"
                    ? "You don't have any appointments yet."
                    : `No ${activeFilter.replace(
                        "_",
                        " "
                      )} appointments found.`}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    onCancel={handleCancelAppointment}
                    onViewDetails={handleViewDetails}
                    cancelLoading={cancelMutation.isPending}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDashboard;
