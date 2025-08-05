export default function ServicesHero() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
      {/* Hero Image and Overlay */}
      <div className="w-[95%] max-w-[2100px] mx-auto relative overflow-hidden">
        <img
          src="/pictures/services.png"
          alt="Salon Background"
          className="w-full h-[620px] object-cover"
        />
        {/* Overlay Text */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center px-12 text-black">
          <h1 className="font-display text-[40px] md:text-[56px] font-bold mb-4 text-white ml-7 mt-12">
            Our Services
          </h1>
          <p className="text-[18px] max-w-[600px] font-medium text-white ml-7">
            Discover our range of professional beauty services, with transparent
            pricing and detailed descriptions to help you make the right choice.
          </p>
        </div>
      </div>

      {/* Beauty Services Menu Section */}
      <div className="w-full px-6 py-16 text-center bg-white">
        <h2 className="text-[28px] md:text-[32px] font-bold mb-6">
          Beauty Services Menu
        </h2>
        <p className="max-w-[700px] mx-auto text-[16px] text-gray-700 leading-relaxed mb-4">
          At Beautiful Eyebrow Threading & Henna, we offer a comprehensive range
          of beauty services to enhance your natural features. Our skilled
          specialists use traditional techniques and premium products to deliver
          exceptional results.
        </p>
        <p className="text-[14px] text-gray-500">
          All prices are in USD and are subject to change. For special requests
          or custom packages, please contact us directly.
        </p>
      </div>
    </section>
  );
}
