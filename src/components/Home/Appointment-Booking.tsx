import {
  Calendar,
  Clock,
  CreditCard,
  Bell,
  CheckCircle,
  User,
  Mail,
  Phone,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface Stylist {
  id: string;
  name: string;
  specialty: string;
}

const services: Service[] = [
  {
    id: "1",
    name: "Premium Hair Cut & Style",
    duration: "90 min",
    price: "$180",
  },
  { id: "2", name: "Color & Highlights", duration: "180 min", price: "$320" },
  {
    id: "3",
    name: "Luxury Facial Treatment",
    duration: "75 min",
    price: "$220",
  },
  { id: "4", name: "Manicure & Pedicure", duration: "120 min", price: "$140" },
];

const stylists: Stylist[] = [
  { id: "1", name: "Isabella Rodriguez", specialty: "Color Specialist" },
  { id: "2", name: "Marcus Chen", specialty: "Cut & Style Expert" },
  { id: "3", name: "Sophia Laurent", specialty: "Facial Therapist" },
  { id: "4", name: "Alexander Kim", specialty: "Nail Artist" },
];

const AppointmentPage = () => {
  const handleReservation = () => {
    // Handle form submission and navigation
    alert("Experience reserved! We'll contact you shortly to confirm details.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/20 to-stone-50/30">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-light tracking-wide text-stone-900 mb-4">
            Book Your
            <span className="block text-6xl font-thin bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent mt-2">
              Experience
            </span>
          </h1>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Info Section */}
          <div className="space-y-12">
            <div className="space-y-6">
              <p className="text-lg text-stone-600 leading-relaxed font-light">
                Reserve your moment of luxury. A refined experience awaits,
                secured with a modest deposit to ensure your exclusive
                appointment.
              </p>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-50 border border-amber-200/30 rounded-3xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-stone-900 mb-3">
                    Cancellation Policy
                  </h2>
                  <p className="text-stone-600 leading-relaxed">
                    Reschedule or cancel up to 24 hours prior. Late changes
                    incur a 10% service adjustment to maintain our premium
                    standards.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-8">
              {[
                {
                  icon: CheckCircle,
                  title: "Effortless Booking",
                  description: "Curated services, seamless scheduling",
                },
                {
                  icon: CreditCard,
                  title: "Secure Payment",
                  description: "Premium protection, multiple options",
                },
                {
                  icon: Bell,
                  title: "Personalized Reminders",
                  description: "Elegant notifications via email & SMS",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-stone-800 to-stone-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-stone-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/20 p-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-display font-light text-stone-900 mb-2">
                Reserve Your Session
              </h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
            </div>

            <div className="space-y-8">
              {/* Service Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Select Service
                </label>
                <select className="w-full p-4 border border-stone-200 rounded-2xl bg-white text-stone-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200">
                  <option value="">Choose your experience...</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.duration} - {service.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl bg-white text-stone-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Stylist Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Select Stylist
                </label>
                <select className="w-full p-4 border border-stone-200 rounded-2xl bg-white text-stone-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200">
                  <option value="">Choose your expert...</option>
                  {stylists.map((stylist) => (
                    <option key={stylist.id} value={stylist.id}>
                      {stylist.name} - {stylist.specialty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-stone-700 mb-3">
                  Preferred Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <input
                    type="time"
                    className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl bg-white text-stone-700 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-1 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl bg-white text-stone-700 placeholder-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl bg-white text-stone-700 placeholder-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-stone-700 mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-12 pr-4 py-4 border border-stone-200 rounded-2xl bg-white text-stone-700 placeholder-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={handleReservation}
                  className="w-full bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 text-white py-5 px-8 rounded-2xl font-medium tracking-wide transition-all duration-300 hover:shadow-2xl hover:shadow-stone-900/25 transform hover:-translate-y-0.5 group"
                >
                  <span className="flex items-center justify-center gap-3">
                    Reserve Experience
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
