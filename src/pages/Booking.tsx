import AppointmentBooking from "../components/booking/Appoinment-Booking";
import AppointmentBookingForm from "../components/booking/Booking-form";
import AppointmentsList from "../components/booking/Get-All";
import Footer from "../components/Home/footer-home";
import Navbar from "../components/Home/Navbar";

export const Booking: React.FC = () => {
  return (
    <div>
      <Navbar />
      <AppointmentBooking />
      <AppointmentBookingForm
        onAppointmentCreated={(id) => console.log(id)}
        loading={false}
        setLoading={() => {}}
        setMessage={() => {}}
      />
      <AppointmentsList />
      <Footer
        heading="Ready To Book Your Service?"
        subheading="Experience the exceptional quality and care that Beautiful Eyebrow Threading & Henna is known for. Book your appointment today."
        primaryButtonText="Book an Appointment"
        primaryButtonLink="/booking"
        secondaryButtonText="Contact Us"
        secondaryButtonLink="/contact"
      />
    </div>
  );
};
