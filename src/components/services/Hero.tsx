export default function ServicesHero() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      {/* Hero Image with Responsive Swap */}
      <div
        className="w-full max-w-[2100px] mx-auto relative 
                      h-[220px] sm:h-[300px] md:h-[450px] lg:h-[620px]
                      overflow-hidden"
      >
        {/* Mobile Image */}
        <img
          src="/pictures/services.png"
          alt="Services Hero"
          className="absolute inset-0 w-full h-full object-cover sm:hidden"
        />

        {/* Desktop Image */}
        <img
          src="/pictures/services.png"
          alt="Services Hero"
          className="absolute inset-0 w-full h-full object-cover hidden sm:block"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-center px-6 md:px-12">
          <h1 className="font-display text-[24px] sm:text-[32px] md:text-[56px] font-bold mb-4 text-white ml-2 sm:ml-4 md:ml-7 mt-6 sm:mt-8 md:mt-12">
            Our Services
          </h1>
          <p
            className="text-[14px] sm:text-[16px] md:text-[16px] font-medium text-white 
             ml-2 sm:ml-4 md:ml-7
             max-w-[260px] sm:max-w-[550px]"
          >
            Discover our range of professional beauty services, with transparent
            pricing and detailed descriptions to help you make the right choice.
          </p>
        </div>
      </div>

      {/* Beauty Services Menu Section */}
      <div className="w-full px-6 py-12 sm:py-16 text-center bg-white">
        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold mb-6">
          Beauty Services Menu
        </h2>
        <p className="max-w-[700px] mx-auto text-[14px] sm:text-[16px] text-gray-700 leading-relaxed mb-4">
          At Beautiful Eyebrow Threading & Henna, we offer a comprehensive range
          of beauty services to enhance your natural features. Our skilled
          specialists use traditional techniques and premium products to deliver
          exceptional results.
        </p>
        <p className="text-[12px] sm:text-[14px] text-gray-500">
          All prices are in USD and are subject to change. For special requests
          or custom packages, please contact us directly.
        </p>
      </div>
    </section>
  );
}
