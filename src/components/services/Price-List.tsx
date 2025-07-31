export default function PriceList() {
  const services = [
    { name: "Eyebrow Threading", price: "$12" },
    { name: "Full Face Threading", price: "$35" },
    { name: "Eyebrow Tinting", price: "$20" },
    { name: "Henna Art (Hands/Arms)", price: "from $25" },
    { name: "Upper Lip Threading", price: "$6" },
    { name: "Classic Lashes", price: "$85" },
    { name: "Hybrid Lashes", price: "$95" },
    { name: "Volume Lashes", price: "$110" },
    { name: "Lash Removal", price: "$15" },
    { name: "Lash Fills", price: "from $40" },
    { name: "Lash Tint", price: "$25" },
    { name: "Brow & Tint Combo", price: "$30" },
    { name: "Henna Party Packages", price: "Contact for pricing" },
  ];

  return (
    <div className="bg-[#f6f4d9] min-h-screen py-20 px-4 flex flex-col items-center font-serif overflow-x-hidden">
      <div className="relative max-w-[640px] w-full mx-8 sm:mx-0">
        {/* Yellow Circles Behind the Card */}
        <div className="absolute top-2 left-2 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>
        <div className="absolute bottom-2 right-2 sm:-bottom-8 sm:-right-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>

        {/* White Card Content */}
        <div className="relative z-10 bg-white shadow-md px-6 py-8">
          <table className="w-full text-left text-sm mt-6">
            <thead>
              <tr className="border-b">
                <th className="pb-3">Service</th>
                <th className="pb-3 text-right">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {services.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2">{item.name}</td>
                  <td className="py-2 text-right">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-6 text-center max-w-md font-sans">
        All prices are subject to change. Please contact us for the most current
        pricing.
      </p>

      <button className="mt-4 bg-black text-white text-xs px-6 py-2 rounded-full">
        Download Price List
      </button>
    </div>
  );
}
