import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Guides() {
  const [showPopup, setShowPopup] = useState(false);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchGuides = async () => {
    setLoading(true);
    // Simulate an API call or local storage retrieval
    setTimeout(() => {
      const fetchedGuides = [
        {
          id: 1,
          name: "Guide1.pdf",
          originalFile: "Presentation1.ppt",
          conversionDate: "2023-07-16",
        },
        {
          id: 2,
          name: "Guide2.pdf",
          originalFile: "Meeting_Notes.ppt",
          conversionDate: "2023-07-15",
        },
      ];
      setGuides(fetchedGuides);
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  useEffect(() => {
    if (location.state && location.state.newGuide) {
      setGuides((prevGuides) => [...prevGuides, location.state.newGuide]);
    }
  }, [location.state]);

  const handleConvert = (guide) => {
    // Save the guide and update the state
    // navigate("/converter", { guide: { selectedGuide: guide } });
    // After conversion, fetch the updated guides
    fetchGuides();
  };

  const downloadPDF = () => {
    console.log("Download as PDF");
    setShowPopup(false);
  };

  const downloadHTML = () => {
    console.log("Download as HTML");
    setShowPopup(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow relative">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-100 z-50">
            <ProgressSpinner />
          </div>
        )}
        {!loading && (
          <div className="flex-grow container mx-auto py-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
              Converted Guides
            </h1>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Guide Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Original File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Conversion Date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {guides.map((guide) => (
                    <tr key={guide.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {guide.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {guide.originalFile}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {guide.conversionDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col items-center">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleConvert(guide)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                              View
                            </button>
                            <button
                              onClick={() => setShowPopup(!showPopup)}
                              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showPopup && (
                <div
                  className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
                  id="my-modal"
                >
                  <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
                    <div className="mt-3 text-center">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Download Options
                      </h3>
                      <div className="mt-2 px-7 py-3">
                        <p className="text-sm text-gray-500">
                          Choose a format to download:
                        </p>
                      </div>
                      <div className="items-center px-4 py-3">
                        <button
                          onClick={downloadPDF}
                          className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                          PDF
                        </button>
                        <button
                          onClick={downloadHTML}
                          className="mt-3 px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                          HTML
                        </button>
                        <button
                          onClick={() => setShowPopup(false)}
                          className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600"
                        >
                          <span className="text-2xl">&times;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Guides;
