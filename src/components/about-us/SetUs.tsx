import { FaStar, FaSpa, FaHandsWash, FaUserFriends } from "react-icons/fa";

const WhatSetsUsApart = () => {
  const features = [
    {
      icon: <FaStar className="text-yellow-600 text-xl" />,
      title: "Expert Artists",
      desc: "Our team consists of highly skilled artists with years of experience in threading, henna, and lash services. Each specialist undergoes rigorous training.",
    },
    {
      icon: <FaSpa className="text-yellow-600 text-xl" />,
      title: "Natural Products",
      desc: "We use only the highest quality, natural products. Our henna is 100% organic and our lash products are hypoallergenic and cruelty-free.",
    },
    {
      icon: <FaHandsWash className="text-yellow-600 text-xl" />,
      title: "Exceptional Hygiene",
      desc: "New threads are used for each client, tools are sterilized, and our salon is cleaned thoroughly every day.",
    },
    {
      icon: <FaUserFriends className="text-yellow-600 text-xl" />,
      title: "Client-Centered Approach",
      desc: "We begin with a consultation to understand your preferences and deliver results that exceed expectations.",
    },
  ];

  const images = [
    "pictures/image1.jpg",
    "pictures/img2.jpg",
    "pictures/img3.png",
    "pictures/img4.jpg",
  ];

  return (
    <section className="bg-white text-gray-800 py-16 px-4 md:px-16">
      <div className="flex flex-col lg:flex-row lg:gap-10 items-start">
        {/* Image Grid - Responsive */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-8 lg:mb-0 w-full lg:w-1/2">
          {images.map((src, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl sm:rounded-2xl shadow-md aspect-square"
            >
              <img
                src={src}
                alt={`feature-${index}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Features Content */}
        <div className="w-full lg:w-1/2 space-y-6 mt-4 lg:mt-10">
          <h3 className="text-2xl font-bold mb-4 px-2 sm:px-6">
            What Sets Us Apart
          </h3>
          {features.map((item, i) => (
            <div key={i} className="flex items-start gap-4 px-2 sm:px-6">
              <div className="mt-1 text-yellow-600 text-xl flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-base mb-2">{item.title}</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsUsApart;
