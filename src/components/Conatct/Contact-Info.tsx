import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ContactInfoSection() {
  const navigate = useNavigate();
  return (
    <div className="w-full md:w-1/2 space-y-6 px-4 sm:px-6 md:px-8">
      {/* Location */}
      <div className="bg-white max-w-[400px] mx-auto md:ml-auto md:mr-8 shadow-md rounded-3xl p-4 sm:p-6 border-l-4 border-b-4 border-[#B65C34]">
        <h3 className="font-semibold mb-2 text-base sm:text-lg">
          Our Location
        </h3>
        <p className="text-sm sm:text-base">
          Beautiful Eyebrow Threading and Henna
        </p>
        <p className="text-sm sm:text-base">2931 O'Donnell St, Baltimore, MD</p>
      </div>

      {/* Contact Methods */}
      <div className="bg-white shadow-md rounded-3xl p-4 sm:p-6 border-l-4 border-b-4 border-[#B65C34] max-w-[400px] mx-auto md:ml-auto md:mr-8">
        <h3 className="font-semibold mb-2 text-base sm:text-lg">
          Contact Methods
        </h3>
        <h2 className="font-medium text-sm sm:text-base mt-3">Phone</h2>
        <p className="text-sm sm:text-base">📞 (410) 555-0123</p>
        <h2 className="font-medium text-sm sm:text-base mt-3">Email</h2>
        <p className="text-sm sm:text-base">✉️ contact@beautifuleyebrow.com</p>
      </div>

      {/* Hours of Operation */}
      <div className="bg-white shadow-md rounded-3xl p-4 sm:p-6 border-l-4 border-b-4 border-[#B65C34] max-w-[400px] mx-auto md:ml-auto md:mr-8">
        <h3 className="font-semibold mb-2 text-base sm:text-lg">
          Hours Of Operation
        </h3>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm sm:text-base">Monday - Friday</p>
          <p className="text-sm sm:text-base">9:00 AM - 8:00 PM</p>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm sm:text-base">Saturday</p>
          <p className="text-sm sm:text-base">10:00 AM - 7:00 PM</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm sm:text-base">Sunday</p>
          <p className="text-sm sm:text-base">11:00 AM - 5:00 PM</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white shadow-md rounded-3xl p-4 sm:p-6 max-w-[350px] mx-auto md:mr-16 border-l-4 border-b-4 border-[#B65C34]">
        <h2 className="text-left font-semibold mb-4 text-base sm:text-lg">
          Connect With US
        </h2>
        <div className="flex justify-start space-x-6 text-2xl text-[#3b5998]">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-[#B65C34] transition-colors duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-[#B65C34] transition-colors duration-300"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>

      {/* Mini Services Box */}
      <div className="bg-white shadow-md rounded-3xl p-4 sm:p-6 max-w-[400px] mx-auto md:ml-auto md:mr-12 border-l-4 border-b-4 border-[#B65C34]">
        <h3 className="font-semibold mb-2 text-base sm:text-lg">Henna</h3>
        <p className="text-sm sm:text-base mb-4">
          Perfect your features with our precise threading services.
        </p>
        <ul className="text-sm sm:text-base mb-4 space-y-1">
          <li>Eyebrow Threading - $12</li>
          <li>Upper Lip Threading - $6</li>
          <li>Full Face Threading - $35</li>
        </ul>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/services")}
            className="bg-black text-white px-6 py-2 rounded-full text-xs sm:text-sm hover:bg-gray-800 transition-colors duration-300"
          >
            Go to Services
          </button>
        </div>
      </div>
    </div>
  );
}
