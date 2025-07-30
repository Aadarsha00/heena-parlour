export default function Hero() {
  return (
    <section className="w-full flex justify-center bg-white ">
      <div className="w-[95%] max-w-[2100px] mx-auto">
        {/* Hero Image and Overlay */}
        <div className="relative overflow-hidden">
          <img
            src="/pictures/hero.png"
            alt="Salon Background"
            className="w-full h-[610px] object-cover"
          />
          <div className="absolute inset-0 bg-[#CEC3AC80]/40 flex flex-col justify-center px-12 text-black">
            <h1 className="font-display text-[34px] md:text-[50px] font-bold max-w-[540px] leading-tight mb-4 mt-6 ">
              Elegance In Every
              <br /> Thread. Art In Every
              <br /> Stroke.
            </h1>
            <p className="text-[18px] max-w-[480px] mb-6  text-gray-950 font-semibold">
              Experience the art of beauty with our expert threading, henna and
              lash services.
            </p>
            <div className="flex gap-4">
              <button className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800">
                Book Now
              </button>
              <button className="bg-white text-black px-6 py-2 rounded-full text-sm hover:bg-gray-100">
                Services
              </button>
            </div>
          </div>
        </div>

        {/* Yellow Banner */}
        <div className="bg-[#F2C744] text-black text-sm text-center py-2 font-semibold w-full">
          Special offer • 10% off for first time clients use code: WELCOME10
          when booking online.
        </div>

        {/* About Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Text Left */}
          <div className="text-black py-40 px-8">
            <h2 className="font-garamond text-[30px] font-bold mb-3 leading-snug">
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
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/pictures/image1.jpg"
              alt="Henna"
              className="rounded-2xl object-cover w-[300px] h-[295px]"
            />
            <img
              src="/pictures/img2.jpg"
              alt="Lashes"
              className="rounded-2xl object-cover w-[300px] h-[295px]"
            />
            <img
              src="/pictures/img3.png"
              alt="Salon"
              className="rounded-2xl object-cover w-[300px] h-[295px]"
            />
            <img
              src="/pictures/img4.jpg"
              alt="Lashes Close"
              className="rounded-2xl object-cover w-[300px] h-[295px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
