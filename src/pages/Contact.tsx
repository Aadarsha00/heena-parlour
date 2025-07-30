import React from "react";
import Navbar from "../components/Home/Navbar";
import ContactForm from "../components/Conatct/Contact-Form";
import ContactInfoSection from "../components/Conatct/Contact-Info";
import Footer from "../components/Home/footer-home";
import ContactMap from "../components/Conatct/Contact-Map";

export const Contact: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-[#f6f4d9] min-h-screen px-4 py-10 font-serif">
        <div className="flex flex-col md:flex-row gap-8">
          <ContactInfoSection />
          <div className="w-full md:w-1/2">
            <ContactMap />
            <ContactForm />
          </div>
        </div>
      </div>
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
