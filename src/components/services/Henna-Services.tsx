// components/HeenaServices.jsx
import { useNavigate } from "react-router-dom";
const services = [
  {
    title: "Henna Art (Hands/Arms)",
    description:
      "Beautiful, intricate henna designs applied to hands or arms. Our artists use 100% natural henna paste to create customized patterns ranging from simple accents to elaborate traditional designs.",
    duration: "30–60 mins",
    priceLabel: "Starting From $25",
    buttonText: "Book Now",
  },
  {
    title: "Brow & Tint Combo",
    description:
      "A popular combination service that includes eyebrow threading for perfect shape and tinting for enhanced color and definition. Save by booking these complementary services together.",
    duration: "30 mins",
    priceLabel: "$30",
    buttonText: "Book Now",
  },
];

const partyPackage = {
  title: "Henna Party Packages",
  description:
    "Special packages for bridal events, bachelorette parties, and other celebrations. Our artists can accommodate groups of various sizes, providing beautiful henna designs for all guests. Contact us for custom quotes based on your specific requirements.",
  priceLabel: "Starting From $25",
  bulletPoints: [
    "Bridal Henna Packages",
    "Group Event Services",
    "On-site Services Available",
  ],
  buttonText: "Contact For Details",
};

export default function HeenaServices() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#f8f6e9] py-12 px-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="bg-[#c09300] p-3 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 2C7.58 2 4 6.03 4 10.5c0 4.78 6.31 10.61 7.17 11.4.26.24.66.24.92 0 .86-.79 7.17-6.62 7.17-11.4C20 6.03 16.42 2 12 2zm0 14c-2.21 0-4-1.79-4-4 0-.49.09-.96.24-1.4l5.16 5.16c-.44.15-.91.24-1.4.24zm3.76-1.6L10.6 9.24c.44-.15.91-.24 1.4-.24 2.21 0 4 1.79 4 4 0 .49-.09.96-.24 1.4z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold">Heena Services</h2>
      </div>

      {/* Top Services */}
      <div className="flex flex-col lg:flex-row gap-20 justify-center mb-14">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white w-full max-w-md p-6 rounded-3xl shadow-md flex flex-col justify-between h-full"
          >
            {/* Top content with price pill */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-[16px] font-bold">{s.title}</h3>
                <p className="text-sm mt-3">{s.description}</p>
                <p className="text-xs text-gray-600 mt-2">
                  Duration: {s.duration}
                </p>
              </div>
              <div className="bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap ml-4">
                {s.priceLabel}
              </div>
            </div>

            {/* Book Now button aligned bottom-right */}
            <div className="mt-auto flex justify-end">
              <button
                onClick={() => navigate("/booking")}
                className="bg-[#a4552c] text-white text-sm px-6 py-2 rounded-full"
              >
                {s.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Party Package */}
      <div className="bg-white max-w-[850px] mx-auto p-6 md:p-8 rounded-3xl shadow-md flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-[16px] font-bold mb-2">{partyPackage.title}</h3>
            <p className="text-sm mb-4">{partyPackage.description}</p>
          </div>
          <div className="bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap ml-4 mt-1">
            {partyPackage.priceLabel}
          </div>
        </div>

        {/* Bullet points */}
        <ul className="text-sm space-y-2 mb-6">
          {partyPackage.bulletPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#c09300]">✔</span> {point}
            </li>
          ))}
        </ul>

        {/* Button bottom-right */}
        <div className="flex justify-end">
          <button
            className="bg-[#a4552c] text-white text-sm px-6 py-2 rounded-full"
            onClick={() => navigate("/booking")}
          >
            {partyPackage.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
