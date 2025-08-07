// Footer.jsx
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IFooter {
  heading?: string;
  subheading?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}
const Footer: React.FC<IFooter> = ({
  heading,
  subheading,
  primaryButtonText,
  primaryButtonLink = "#",
  secondaryButtonText,
  secondaryButtonLink = "#",
}) => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      {/* Top Section: Optional Header + Buttons */}
      {(heading || subheading || primaryButtonText || secondaryButtonText) && (
        <div className="max-w-5xl mx-auto text-center mb-10">
          {heading && (
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-4">
              {subheading}
            </p>
          )}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {primaryButtonText && (
              <a
                href={primaryButtonLink}
                className="bg-[#A0522D] hover:bg-white hover:text-black text-white py-2 px-4 rounded-2xl text-sm"
              >
                {primaryButtonText}
              </a>
            )}
            {secondaryButtonText && (
              <a
                href={secondaryButtonLink}
                className="border border-white text-white py-2 px-4 rounded-2xl text-sm hover:bg-white hover:text-black"
              >
                {secondaryButtonText}
              </a>
            )}
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-8">
        {/* Company Info */}
        <div className="min-w-[200px] mt-6">
          <h3 className="text-lg font-semibold mb-2">Beautiful Eyebrow</h3>
          <p className="text-sm mb-4 max-w-[200px]">
            Enhancing your natural beauty through expert threading, henna, and
            lash services.
          </p>
          <div className="flex space-x-4">
            <a href="#">
              <FaInstagram
                className="text-white hover:text-gray-400"
                size={18}
              />
            </a>
            <a href="#">
              <FaFacebookF
                className="text-white hover:text-gray-400"
                size={18}
              />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="min-w-[150px]">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-white">
            <li>
              <Link to="/" className="text-white hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white hover:text-gray-400">
                Services
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-white hover:text-gray-400">
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/testimonials"
                className="text-white hover:text-gray-400"
              >
                Testimonials
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-white hover:text-gray-400">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Services */}
        <div className="min-w-[150px]">
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <ul className="space-y-1 text-sm">
            <li>Eyebrow Threading</li>
            <li>Full Face Threading</li>
            <li>Henna Art</li>
            <li>Bridal Henna</li>
            <li>Classic Lashes</li>
            <li>Volume Lashes</li>
            <li>Hybrid Lashes</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="min-w-[200px]">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">2931 O'Donnell St, Baltimore, MD</p>
          <p className="text-sm">(410) 555-1234</p>
          <p className="text-sm">info@beautifuleyebrow.com</p>
          <p className="text-sm mt-2">Mon–Sat: 9AM – 6PM</p>
          <p className="text-sm">Sun: 10AM – 4PM</p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-xs text-gray-400">
        © 2025 Beautiful Eyebrow Threading & Henna. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
