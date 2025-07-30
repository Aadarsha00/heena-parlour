import Footer from "../components/Home/footer-home";
import Navbar from "../components/Home/Navbar";
import PaymentTestContainer from "../components/payment/Payment-container";

export const Payment: React.FC = () => {
  return (
    <div>
      <Navbar />
      <PaymentTestContainer />
      <Footer />
    </div>
  );
};
