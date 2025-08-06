import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full bg-white  relative">
      <div className="flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <div className="w-12 h-12 bg-[#f3e8dc] rounded-full flex items-center justify-center ml-7">
          <img src="/pictures/logo.png" alt="Logo" className="w-10 h-10" />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li>
            <a href="/" className="text-gray-900 hover:text-gray-700">
              Home
            </a>
          </li>
          <li>
            <a href="/services" className="text-gray-900 hover:text-gray-700">
              Services
            </a>
          </li>
          <li>
            <a href="/gallery" className="text-gray-900 hover:text-gray-700">
              Gallery
            </a>
          </li>
          <li>
            <a href="/blog" className="text-gray-900 hover:text-gray-700">
              Blog
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-900 hover:text-gray-700">
              Contact
            </a>
          </li>
          <li>
            <a href="/about" className="text-gray-900 hover:text-gray-700">
              About Us
            </a>
          </li>
        </ul>

        {/* Desktop Book Now Button */}
        <a href="/services">
          <button className="hidden md:block bg-black text-white py-2 px-4 mr-10 rounded-full text-sm hover:bg-gray-800">
            Book Now
          </button>
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden mr-10 p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200 border-0 bg-transparent"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <div
              className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></div>
            <div
              className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-full h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></div>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <ul className="py-4 px-6">
            <li className="py-2">
              <a
                href="/"
                className="text-gray-900 hover:text-gray-700 block text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
            </li>

            <li className="py-2">
              <a
                href="/services"
                className="text-gray-900 hover:text-gray-700 block text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
            </li>
            <li className="py-2">
              <a
                href="/gallery"
                className="text-gray-900 hover:text-gray-700 block text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </a>
            </li>
            <li className="py-2">
              <a
                href="/blog"
                className="text-gray-900 hover:text-gray-700 block text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </a>
            </li>
            <li className="py-2">
              <a
                href="/contact"
                className="text-gray-900 hover:text-gray-700 block text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </li>

            <li className="py-2">
              <a
                href="/about"
                className="text-gray-900 hover:text-gray-700 block text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
            </li>
            <li className="py-3">
              <button
                className="w-full bg-black text-white py-2 px-4 rounded-full text-sm hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
