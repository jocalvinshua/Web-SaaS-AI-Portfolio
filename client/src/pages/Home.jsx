import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import Brands from "../components/Brands.jsx"
import Features from "../components/Features.jsx";
import Testimonials from "../components/Testimonials.jsx";
import CTA from "../components/CTA.jsx";
import Footer from "../components/Footer.jsx";

export default function Home(){
    return(
        <div className="min-h-screen bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat">
            <Navbar />
            <HeroSection />
            <Brands />
            <Features />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    )
}