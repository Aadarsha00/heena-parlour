import { FaLeaf, FaUserAlt, FaShieldAlt } from "react-icons/fa";

const PhilosophySection = () => {
  const philosophies = [
    {
      icon: <FaLeaf className="text-yellow-600 text-4xl mb-4" />,
      title: "Natural Approach",
      desc: "We prioritize natural beauty enhancement using traditional techniques that have stood the test of time. Our threading method is chemical-free and our henna products are plant-based.",
    },
    {
      icon: <FaUserAlt className="text-yellow-600 text-4xl mb-4" />,
      title: "Personalized Service",
      desc: "Each client is unique. We tailor our services to suit your features, skin tone, and personal style to bring out your natural beauty.",
    },
    {
      icon: <FaShieldAlt className="text-yellow-600 text-4xl mb-4" />,
      title: "Quality and Safety",
      desc: "We uphold the highest hygiene standards. Threading is done with sanitized threads, henna is allergen-free, and our lash products are medical grade.",
    },
  ];

  return (
    <section className="bg-[#f9f9e9] py-20 px-4 md:px-6 overflow-x-hidden">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-3xl font-bold mb-4">Our Philosophy</h2>
        <p className="text-lg">
          At Beautiful Eyebrow Threading & Henna, we believe in enhancing your
          natural beauty through time-honored techniques and personalized care.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {philosophies.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg p-10 h-[330px] w-full max-w-[350px] flex flex-col items-center justify-start text-center"
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;
