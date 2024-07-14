import React, { useState, useRef } from "react";
import Navbar from "../Components/Navbar";

function Converter() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [guide, setGuide] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }
    setConverting(true);
    // Simulating conversion process
    setTimeout(() => {
      setConverting(false);
      setGuide("1. Step One\n2. Step Two\n3. Step Three");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          PPT to Guide Converter
        </h1>
        {guide && (
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <h2 className="text-2xl font-bold mb-4">Generated Guide</h2>
            <pre className="whitespace-pre-wrap">{guide}</pre>
          </div>
        )}
      </div>
      <div className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-l-lg shadow-lg">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".ppt,.pptx"
        />
        <button onClick={handleIconClick} className="focus:outline-none">
          <svg
            className="w-10 h-10 text-blue-500 hover:text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" />
          </svg>
        </button>
        {file && (
          <button
            onClick={handleConvert}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={converting}
          >
            {converting ? "Converting..." : "Convert"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Converter;
