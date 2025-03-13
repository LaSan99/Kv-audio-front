import { Routes, Route } from "react-router-dom";
import Header from "../../components/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";
import ErrorNotFound from "./error";
import ProductOverview from "./productOverview";
import BookingPage from "./bookingPage";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="h-[clac(100vh-100px)] w-full ">
      <Routes path="/*">
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/items" element={<Items/>}/>
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/product/:key" element={<ProductOverview/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/*" element={<ErrorNotFound/>}/>
        </Routes>
      </div>
    </>
  );
}
