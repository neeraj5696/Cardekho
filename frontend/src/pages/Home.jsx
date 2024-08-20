import React from "react";
import Header from "../components/Header";
import CarListing from "./CarListing";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <div>
        <Header />
      
      </div>

      <div>
        <CarListing />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
