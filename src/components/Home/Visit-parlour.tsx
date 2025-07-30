import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { FaInstagram, FaFacebook } from "react-icons/fa";

export default function VisitParlor() {
  return (
    <section className="bg-white py-16 px-6 flex flex-col items-center">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-start">
        {/* Left Side - Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Visit Our Parlor</h2>
          <p className="text-gray-700 mb-6">
            We’re conveniently located in Baltimore. Stop by or reach out to us
            with any questions.
          </p>

          <ul className="space-y-6 text-gray-800 text-sm">
            {/* Address */}
            <li className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-yellow-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Address</h4>
                <p>2931 O'Donnell St, Baltimore, MD</p>
              </div>
            </li>

            {/* Phone */}
            <li className="flex items-start gap-4">
              <FaPhone className="text-yellow-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Phone</h4>
                <p>(410) 555-1234</p>
              </div>
            </li>

            {/* Email */}
            <li className="flex items-start gap-4">
              <FaEnvelope className="text-yellow-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Email</h4>
                <p>info@beautifuleyebrow.com</p>
              </div>
            </li>

            {/* Hours */}
            <li className="flex items-start gap-4">
              <FaClock className="text-yellow-500 text-xl mt-1" />
              <div>
                <h4 className="font-semibold mb-1">Hours</h4>
                <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p>Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              aria-label="Instagram"
              className="text-black hover:opacity-70"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-black hover:opacity-70"
            >
              <FaFacebook className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Right Side - Clickable Google Map */}
        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3103.139146082685!2d-76.57459668464833!3d39.28034347951274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c8049bb3e6c55f%3A0xdeaee2e5a2575ad6!2s2931%20O'Donnell%20St%2C%20Baltimore%2C%20MD%2021224%2C%20USA!5e0!3m2!1sen!2snp!4v1720959059619!5m2!1sen!2snp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
