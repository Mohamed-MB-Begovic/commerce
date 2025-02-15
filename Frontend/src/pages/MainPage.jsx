import { useEffect } from "react";
import BestSellers from "../components/BestSellers";
import Collections from "../components/Collections";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import NewArrivals from "../components/NewArrivals";
import Newsletter from "../components/Newsletter";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS styles



export default function MainPage() {
  
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (optional)
      easing: 'ease-in-out', // Easing function (optional)
      once: true, // Whether animation should only happen once (optional)
    });
  }, []);

  return (
    <div className="w-full overflow-hidden ">
    <Navbar/>
<HeroSection/>   
<Collections/>
<BestSellers/>  
<NewArrivals/>
<Newsletter/>
    <Footer/>
  </div>
  )
}
