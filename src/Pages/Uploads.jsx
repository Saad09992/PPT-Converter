import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";

function Uploads() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([
    { id: 1, name: "Presentation1.ppt", uploadDate: "2023-07-15" },
    { id: 2, name: "Meeting_Notes.ppt", uploadDate: "2023-07-14" },
  ]);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newFile = {
        id: files.length + 1,
        name: file.name,
        uploadDate: new Date().toISOString().split("T")[0],
      };

      // Simulate file upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            setFiles([...files, newFile]);
            setTimeout(() => setUploadProgress(0), 500); // Hide progress bar after completion
            return 100;
          }
          return prevProgress + 10;
        });
      }, 300);
    }
  };

  const handleConvert = (file) => {
    navigate("/converter", { state: { selectedFile: file } });
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
              Uploaded PPT Files
            </h1>
            <div className="mb-8">
              <div className="flex items-center">
                <input
                  type="file"
                  accept=".ppt,.pptx"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-100 file:text-blue-700
                        hover:file:bg-blue-200"
                />
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-4 w-1/3">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-6 mb-4 text-xs flex rounded bg-green-200">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-300"
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-hidden relative z-10">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {files.map((file) => (
                    <tr key={file.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {file.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {file.uploadDate}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleConvert(file)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                        >
                          Convert
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Uploads;
