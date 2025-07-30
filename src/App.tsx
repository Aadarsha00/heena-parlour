import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/About-Us";
import { Service } from "./pages/Services";
import { Gallery } from "./pages/Gallery";
import { Contact } from "./pages/Contact";
import { Booking } from "./pages/Booking";
import { Payment } from "./pages/Payment";
import LoginPage from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/services" element={<Service />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
