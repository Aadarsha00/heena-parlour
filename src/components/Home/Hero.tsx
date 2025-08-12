export default function Hero() {
  return (
    <section className="w-full flex justify-center bg-white overflow-x-hidden">
      <div className="w-full max-w-[2100px] mx-auto">
        {/* Hero Image and Overlay */}
        <div className="relative overflow-hidden">
          {/* Desktop Image */}
          <img
            src="/pictures/hero1.png"
            alt="Hero Desktop"
            className="hidden md:block w-full h-[610px] object-cover object-[center_right]"
          />

          {/* Mobile Image */}
          <img
            src="/pictures/mobile-hero.png"
            alt="Hero Mobile"
            className="block md:hidden w-full h-[500px] object-cover object-right"
          />

          {/* Overlay Content */}
          <div
            className="absolute inset-0 flex flex-col justify-start md:justify-start 
                        pt-12 md:pt-32 px-5 sm:px-6 md:px-12 text-black 
                        items-start text-left"
          >
            <h1
              className="font-display 
                         text-[30px] sm:text-[30px] md:text-[50px] 
                         font-bold max-w-[300px] sm:max-w-[360px] md:max-w-[540px] 
                         leading-tight mb-3 mt-2 md:mt-6"
            >
              Elegance In Every
              <br /> Thread. Art In Every
              <br /> Stroke.
            </h1>

            <p
              className="text-[19px] mt-3 sm:text-[17px] md:text-[18px] 
                         max-w-[220px] sm:max-w-[280px] md:max-w-[380px] 
                         mb-6 text-gray-950 font-semibold"
            >
              Experience the art of beauty with our expert threading, henna and
              lash services.
            </p>

            {/* Buttons Container */}
            <div className="md:mb-0 mb-32 sm:mb-8">
              {/* Mobile: Stack vertically with spacer */}
              <div className="flex flex-col md:hidden">
                <div className="flex-1"></div>
                <div className="flex flex-col gap-4">
                  <a href="/services">
                    <button className="bg-black text-white px-5 py-2 rounded-full text-sm w-full transition-transform duration-200 hover:scale-105 hover:shadow-md hover:bg-black focus:outline-none focus:ring-0">
                      Book Now
                    </button>
                  </a>
                  <a href="/about">
                    <button className="bg-white text-black border-2 border-black px-5 py-2 rounded-full text-sm w-full transition-transform duration-200 hover:scale-105 hover:shadow-md hover:bg-white focus:outline-none focus:ring-0">
                      About Us
                    </button>
                  </a>
                </div>
              </div>

              {/* Desktop: Side by side, directly below text */}
              <div className="hidden md:flex gap-4">
                <a href="/services">
                  <button className="bg-black text-white px-6 py-2 rounded-full text-base transition-transform duration-200 hover:scale-105 hover:shadow-md hover:bg-black focus:outline-none focus:ring-0">
                    Book Now
                  </button>
                </a>
                <a href="/about">
                  <button className="bg-white text-black border-2 border-black px-6 py-2 rounded-full text-base transition-transform duration-200 hover:scale-105 hover:shadow-md hover:bg-white focus:outline-none focus:ring-0">
                    About Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Yellow Banner */}
        <div className="bg-black text-white text-sm text-center py-2 font-semibold w-full">
          Special offer • 10% off for first time clients use code: WELCOME10
          when booking online.
        </div>

        {/* About Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Text Left */}
          <div className="text-black py-8 px-4 md:py-40 md:px-8">
            <h2 className="font-display text-[30px] font-bold mb-3 leading-snug">
              Welcome to Beautiful <br /> Eyebrow Threading & Henna
            </h2>
            <p className="text-gray-700 mb-4 max-w-md text-sm leading-relaxed">
              We are dedicated to enhancing your natural beauty through our
              expert threading, henna, and lash services. With skilled artists
              and a commitment to quality, we ensure each client leaves feeling
              confident and beautiful.
            </p>
            <ul className="flex flex-wrap gap-4 text-sm font-medium">
              <li className="flex items-center gap-1">
                <span className="text-yellow-500">✔</span> Expert Threading
              </li>
              <li className="flex items-center gap-1">
                <span className="text-yellow-500">✔</span> Artistic Henna
              </li>
              <li className="flex items-center gap-1">
                <span className="text-yellow-500">✔</span> Luxurious Lashes
              </li>
            </ul>
          </div>

          {/* Image Grid Right */}
          <div className="grid grid-cols-2 gap-3 px-4 sm:px-8">
            {[
              "/pictures/image1.jpg",
              "/pictures/img2.jpg",
              "/pictures/img3.png",
              "/pictures/img4.jpg",
            ].map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Gallery ${idx + 1}`}
                className="rounded-2xl w-full h-[140px] sm:h-[180px] md:w-[300px] md:h-[295px] object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
