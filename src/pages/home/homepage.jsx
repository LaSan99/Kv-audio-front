import { Routes, Route } from "react-router-dom";
import Header from "../../components/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";
import Review from "./review";
import Footer from "../../components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-white pt-[75px] pb-8 flex flex-col">
        <div className="flex-grow">
          <Routes path="/*">
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/items" element={<Items />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/review" element={<Review />} />
            <Route path="/product/:key" element={<ProductOverview />} />
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<ErrorNotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
}
