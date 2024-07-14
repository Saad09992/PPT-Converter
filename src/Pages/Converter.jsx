import React, { useState, useRef } from "react";
import Navbar from "../Components/Navbar";

function Converter() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [guide, setGuide] = useState("");
  const [editable, setEditable] = useState(false); // State for editable mode
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

    // Simulating file upload and conversion process
    // Replace with actual backend API call in your application
    try {
      // Simulating delay for conversion process
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulating response from server
      const result = {
        guide: `Generated guide content for ${file.name}`,
      };
      setGuide(result.guide);
    } catch (error) {
      console.error("Error converting file:", error);
    } finally {
      setConverting(false);
    }
  };

  const handleGuideChange = (e) => {
    setGuide(e.target.value);
  };

  const handleEditableChange = (e) => {
    setEditable(e.target.checked);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(guide)
      .then(() => {
        alert("Guide content copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying to clipboard:", err);
        alert("Failed to copy guide content to clipboard.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          PPT to Guide Converter
        </h1>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
          <h2 className="text-2xl font-bold mb-4">
            Generated Guide
            <label className="ml-4">
              <input
                type="checkbox"
                checked={editable}
                onChange={handleEditableChange}
                className="mr-2"
              />
              Editable
            </label>
          </h2>
          <textarea
            className="w-full h-64 p-2 border border-gray-300 rounded"
            value={guide}
            onChange={handleGuideChange}
            readOnly={!editable} // Toggle read-only based on editable state
            placeholder="Enter guide content..."
          />
          <button
            onClick={handleCopyToClipboard}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!guide.trim()} // Disable if guide content is empty
          >
            Copy to Clipboard
          </button>
        </div>
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
