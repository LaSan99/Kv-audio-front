import { HeroSection } from "../../components/HeroSection";
import { EquipmentCategories } from "../../components/EquipmentCategories";
import { FeaturedProducts } from "../../components/FeaturedProducts";
import { HowItWorks } from "../../components/HowItWorks";
import { Testimonials } from "../../components/Testimonials";
import { CTASection } from "../../components/CTASection";
export default function Home() {
    return (
        <div className="min-h-screen w-full">
            <HeroSection />
            <EquipmentCategories />
            <FeaturedProducts />
            <HowItWorks />
            <Testimonials />
            <CTASection />
        </div>
    );
}