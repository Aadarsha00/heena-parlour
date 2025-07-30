type PriceItem = {
  name: string;
  price: string;
};

type ServiceCardProps = {
  title: string;
  description: string;
  image: string;
  prices: PriceItem[];
};

const ServiceCard = ({
  title,
  description,
  image,
  prices,
}: ServiceCardProps) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col">
    <img src={image} alt={title} className="w-full h-56 object-cover" />
    <div className="p-6 flex flex-col flex-1 justify-between">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <ul className="space-y-1 mb-4">
        {prices.map((item) => (
          <li key={item.name} className="flex justify-between">
            <span>{item.name}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default ServiceCard;
