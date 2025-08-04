import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/About-Us";
import { Service } from "./pages/Services";
import { Contact } from "./pages/Contact";
import { Booking } from "./pages/Booking";
import { Payment } from "./pages/Payment";
import ScrollToTop from "./ui/Scroll-Top";
import { Gallery } from "./pages/Gallery";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/Protected-Route";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Service />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/booking/:serviceId"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />
          <Route path="/payment" element={<Payment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
