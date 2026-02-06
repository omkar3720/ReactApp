import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function GetSingleStudent() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      //.get(`http://localhost:8080/api/v1/getSingle/${id}`)
      .get(`http://localhost:8080/ReactAppBackend-0.0.1-SNAPSHOT/api/v1/getSingle/${id}`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error.message));
  }, [id]);

  if (!data) {
    return (
      <div className="text-center mt-5 text-secondary">
        Loading student data...
      </div>
    );
  }

  const handleViewPDF = () => {
    const base64Pdf = `data:application/pdf;base64,${data.address.pdfFile}`;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>View PDF</title>
            <style>
              body, html { margin: 0; padding: 0; height: 100%; }
              iframe { width: 100%; height: 100%; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${base64Pdf}"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 p-4">
      <div
        className="card shadow-lg rounded-4 border-0"
        style={{ width: "32rem" }}
      >
        <div className="card-body p-4">
          <h2 className="card-title text-center text-primary fw-bold mb-4">
            🎓 Student Profile
          </h2>

          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <strong>Name:</strong> {data.name}
            </li>
            <li className="list-group-item">
              <strong>Roll Number:</strong> {data.rollNumber}
            </li>
            <li className="list-group-item">
              <strong>Age:</strong> {data.age}
            </li>
          </ul>

          <h4 className="text-secondary mt-4 mb-3">🏠 Address</h4>
          <ul className="list-group list-group-flush mb-3">
            <li className="list-group-item">
              <strong>Street:</strong> {data.address.street}
            </li>
            <li className="list-group-item">
              <strong>City:</strong> {data.address.city}
            </li>
            <li className="list-group-item">
              <strong>Zip Code:</strong> {data.address.zipCode}
            </li>
          </ul>

          {data.address.imageDocument && (
            <div className="text-center mt-4">
              <h5 className="mb-3 text-muted">📷 Uploaded Image</h5>
              <img
                src={`data:image/jpeg;base64,${data.address.imageDocument}`}
                alt="Student Document"
                className="rounded-circle shadow"
                style={{ height: "160px", width: "160px", objectFit: "cover" }}
              />
            </div>
          )}

          {data.address.pdfFile && (
            <div className="mt-4 text-center">
              <h5 className="mb-3 text-muted">📄 PDF Document</h5>
              <a
                href={`data:application/pdf;base64,${data.address.pdfFile}`}
                download="document.pdf"
                className="btn btn-outline-primary me-2"
              >
                Download PDF
              </a>
              <button
                className="btn btn-outline-primary"
                onClick={handleViewPDF}
              >
                View PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GetSingleStudent;
