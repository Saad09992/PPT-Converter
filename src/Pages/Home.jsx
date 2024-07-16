import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Convert Your PPT to Guides Effortlessly
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Transform your presentations into detailed guides with just a few
          clicks.
        </p>
        <Link to="/converter">
          <button className="bg-green-500 text-white py-3 px-8 rounded-full text-lg hover:bg-green-600 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Easy Upload</h3>
            <p className="text-gray-600">
              Upload your PPT files quickly and easily.
            </p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Fast Conversion</h3>
            <p className="text-gray-600">
              Convert your presentations to guides in seconds.
            </p>
          </div>
          <div className="bg-gray-300 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">High Quality</h3>
            <p className="text-gray-600">
              Get high-quality guides with clear formatting.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Our platform offers the best solution for converting your PPT files
            into comprehensive guides. Here’s why:
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">User-Friendly</h3>
              <p className="text-gray-600">
                Our interface is intuitive and easy to navigate, making the
                conversion process smooth and simple.
              </p>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Secure</h3>
              <p className="text-gray-600">
                Your files are safe with us. We use top-notch security measures
                to protect your data.
              </p>
            </div>
            <div className="bg-gray-300 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Feedback</h3>
              <p className="text-gray-600">
                We value your feedback and continuously improve our services
                based on your input.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
