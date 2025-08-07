import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="w-full flex flex-col items-center bg-white overflow-x-hidden">
      {/* Hero Image and Overlay */}
      <div className="w-[95%] max-w-[2100px] mx-auto relative overflow-hidden">
        <img
          src="/pictures/hero.png"
          alt="Salon Background"
          className="w-full h-[630px] object-cover"
        />
        <div
          className="absolute inset-0 bg-[#00000080]/30 flex flex-col 
                        justify-start md:justify-center 
                        pt-64 sm:pt-56 md:pt-0
                        px-6 md:px-12 text-black"
        >
          <h1 className="font-display text-white text-[34px] md:text-[50px] font-bold max-w-[540px] leading-tight mb-7">
            About Our Salon
          </h1>
          <p className="text-[16px] sm:text-[18px] mb-6 text-white font-semibold max-w-[260px] sm:max-w-[540px]">
            Discover the story, values, and commitment behind Beautiful{" "}
            <br className="hidden md:block" />
            Eyebrow Threading & Henna.
          </p>
          <div className="flex gap-4">
            <Link
              to="/services"
              className="bg-white text-black px-6 py-2 rounded-full text-sm hover:bg-gray-100"
            >
              View Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="w-[95%] max-w-7xl mt-20 mb-20 flex flex-col md:flex-row items-center gap-12 px-6">
        {/* Text Content */}
        <div className="md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Beautiful Eyebrow Threading & Henna began as a small family business
            in 2010, founded by Priya Sharma, who brought her expertise in
            traditional South Asian beauty techniques to Baltimore.
          </p>
          <p className="text-gray-700 mb-4">
            With a passion for threading and henna artistry passed down through
            generations, Priya started with small kiosks offering eyebrow
            threading services. Her precise technique and warm personality
            quickly earned her a loyal clientele.
          </p>
          <p className="text-gray-700 mb-4">
            As demand grew, the business expanded to include henna art and lash
            services, eventually moving to our current location on O'Donnell
            Street where we continue to serve the Baltimore community with the
            same dedication to quality and personalized care.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <div>
              <p className="font-semibold">Priya Sharma</p>
              <p className="text-sm text-gray-600">Founder & Lead Artist</p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative flex justify-center items-center max-w-[480px] md:ml-10">
          {/* Top Left Yellow Circle */}
          <div className="absolute -top-6 -left-5 w-16 h-16 bg-yellow-400 rounded-full z-0"></div>

          {/* Bottom Right Yellow Circle */}
          <div className="absolute -bottom-6 -right-5 w-16 h-16 bg-yellow-400 rounded-full z-0"></div>

          {/* Framed Image */}
          <div className="relative z-10 rounded-2xl bg-[#F8F6E8] p-4">
            <img
              src="/pictures/hero.png"
              alt="Salon Interior"
              className="rounded-lg max-w-[95%] h-auto object-cover shadow-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
