import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";

function Converter() {
  const [file, setFile] = useState(null);
  const [converting, setConverting] = useState(false);
  const [guide, setGuide] = useState("");
  const [editable, setEditable] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [downloadPopup, setDownloadPopup] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const quillRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    if (location.state && location.state.selectedFile) {
      setFile(location.state.selectedFile);
    }
  }, [location]);

  const handleSelectFile = () => {
    navigate("/uploads");
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.name.endsWith(".ppt") ||
        selectedFile.name.endsWith(".pptx"))
    ) {
      setFile(selectedFile);
    } else {
      alert("Please select a valid PPT or PPTX file.");
      setFile(null);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      alert("Please upload a PPT/PPTX file first.");
      return;
    }

    setConverting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate processing time

      // Generate a mock step-by-step guide
      const mockGuide = generateMockGuide(file.name);
      setGuide(mockGuide);
      setEditable(true);
      setIsConverted(true);
    } catch (error) {
      console.error("Error converting file:", error);
      alert("An error occurred while converting the file.");
    } finally {
      setConverting(false);
    }
  };

  const generateMockGuide = (fileName) => {
    return `
      <h1>Step-by-Step Guide: ${fileName}</h1>
      <h2>Introduction</h2>
      <p>This guide is based on the presentation "${fileName}". Follow these steps to understand the key points of the presentation.</p>
      <h2>Step 1: Overview</h2>
      <p>Begin by reviewing the title slide and agenda to get an overview of the presentation's main topics.</p>
      <h2>Step 2: Key Concepts</h2>
      <p>Identify and list the main concepts introduced in the presentation. These are typically found in section headers or bold text.</p>
      <h2>Step 3: Details and Examples</h2>
      <p>For each key concept, note down supporting details and examples provided in the slides.</p>
      <h2>Step 4: Visual Aids</h2>
      <p>Pay attention to any charts, graphs, or images in the presentation. Describe their relevance to the topic.</p>
      <h2>Step 5: Conclusion</h2>
      <p>Summarize the main takeaways from the presentation and any call-to-action points mentioned.</p>
      <h2>Next Steps</h2>
      <p>Review this guide alongside the original presentation for a comprehensive understanding of the material.</p>
    `;
  };

  const handleGuideChange = (content) => {
    setGuide(content);
  };

  const handleCopyToClipboard = () => {
    const textContent = guide.replace(/<[^>]+>/g, "\n").trim();
    navigator.clipboard
      .writeText(textContent)
      .then(() => alert("Guide content copied to clipboard!"))
      .catch((err) => {
        console.error("Error copying to clipboard:", err);
        alert("Failed to copy guide content to clipboard.");
      });
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", reader.result);
        };

        reader.readAsDataURL(file);
      }
    };
  };

  const downloadPDF = () => {
    console.log("Download as PDF");
    setDownloadPopup(false);
  };

  const downloadHTML = () => {
    console.log("Download as HTML");
    setDownloadPopup(false);
  };

  const handleSaveGuide = () => {
    if (!guide.trim()) {
      alert("Guide content is empty.");
      return;
    }

    // saving guide
    setSaveProgress(0);
    const interval = setInterval(() => {
      setSaveProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          setShowPopup(true); // Show popup message
          setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
          return 100;
        }
        return prevProgress + 10;
      });
    }, 100);
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
          <div className="overflow-auto">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8 text-center">
                PPT to Step-by-Step Guide Converter
              </h1>
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 relative">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={handleSelectFile}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Select PPT
                    </button>
                    {file && <span className="ml-4">{file.name}</span>}
                  </div>
                  {file && !isConverted && (
                    <div className="flex items-center">
                      <button
                        onClick={handleConvert}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative"
                        disabled={converting}
                      >
                        {converting ? "Converting..." : "Convert"}
                      </button>
                      {converting && (
                        <div className="ml-4 w-1/3">
                          <div className="relative pt-1">
                            <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-green-200">
                              <div
                                style={{ width: `100%` }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-300"
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    Generated Step-by-Step Guide
                  </h2>
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
                    ref={quillRef}
                    theme="snow"
                    value={guide}
                    onChange={handleGuideChange}
                    readOnly={!editable}
                    modules={modules}
                    placeholder="Your step-by-step guide will appear here after conversion..."
                    className="h-72 mb-3"
                  />
                </div>
                {isConverted && (
                  <div>
                    <button
                      onClick={handleCopyToClipboard}
                      className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      disabled={!guide.trim()}
                    >
                      Copy to Clipboard
                    </button>
                    <button
                      onClick={() => setDownloadPopup(!downloadPopup)}
                      className="mt-4 ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Download Guide
                    </button>
                    {downloadPopup && (
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
                                onClick={() => setDownloadPopup(false)}
                                className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600"
                              >
                                <span className="text-2xl">&times;</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleSaveGuide}
                      className="mt-4 ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative"
                    >
                      Save
                    </button>
                    {saveProgress > 0 && saveProgress < 100 && (
                      <div className="mt-4 w-1/3">
                        <div className="relative pt-1">
                          <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-green-200">
                            <div
                              style={{ width: `${saveProgress}%` }}
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-300"
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {showPopup && (
                      <div className="absolute right-0 bottom-0 mb-4 mr-10 bg-green-500 text-white p-4 rounded shadow-lg transition-transform duration-500 transform translate-x-full animate-slide-in-out">
                        Saved successfully!
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Converter;
