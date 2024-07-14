import React, { useState, useRef } from "react";
import Navbar from "../Components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  const handleGuideChange = (content) => {
    setGuide(content);
  };

  const handleEditableChange = (e) => {
    setEditable(e.target.checked);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex-grow overflow-auto">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            PPT to Guide Converter
          </h1>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".ppt,.pptx"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                    <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                  </svg>
                  Upload PPT
                </button>
                {file && <span className="ml-4">{file.name}</span>}
              </div>
              {file && (
                <button
                  onClick={handleConvert}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  disabled={converting}
                >
                  {converting ? "Converting..." : "Convert"}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Generated Guide</h2>
              <div className="flex items-center">
                <span className="mr-3 text-sm font-medium text-gray-900">
                  Editable
                </span>
                <button
                  onClick={() => setEditable(!editable)}
                  className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${
                    editable ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <span className="sr-only">Enable editing</span>
                  <span
                    className={`inline-block w-4 h-4 transform transition ease-in-out duration-200 bg-white rounded-full ${
                      editable ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
            <div className="mb-6">
              <ReactQuill
                theme="snow"
                value={guide}
                onChange={handleGuideChange}
                readOnly={!editable}
                modules={modules}
                placeholder="Enter guide content..."
              />
            </div>
            <button
              onClick={handleCopyToClipboard}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={!guide.trim()}
            >
              Copy to Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Converter;
