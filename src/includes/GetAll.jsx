import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function GetAll() {
  const [student, setStudent] = useState([]);

  const getAll = () => {
    axios
      //.get("http://localhost:8080/api/v1/getAll")
      .get("http://localhost:8080/ReactAppBackend-0.0.1-SNAPSHOT/api/v1/getAll")
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setStudent(res.data);
        }
      })
      .catch((error) => alert(error.message));
  };

  useEffect(getAll, []);

  const deleteStudent = (id) => {
    axios
    //.delete(`http://localhost:8080/api/v1/delete/${id}`)
    .delete(`http://localhost:8080/ReactAppBackend-0.0.1-SNAPSHOT/api/v1/delete/${id}`)
    .then((res) => {
      if (res.status === 204) {
        getAll();
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Student Details</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Age</th>
              <th>Street</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {student.length > 0 ? (
              student.map((stu, index) => (
                <tr key={index}>
                  <td>{stu.id}</td>
                  <td>{stu.name}</td>
                  <td>{stu.rollNumber}</td>
                  <td>{stu.age}</td>
                  <td>{stu.address.street}</td>
                  <td>{stu.address.city}</td>
                  <td>{stu.address.zipCode}</td>
                  <td>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={`/edit/${stu.id}`}
                    >
                      Edit
                    </Link>

                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => deleteStudent(stu.id)}
                    >
                      Delete
                    </button>
                    <Link
                      className="btn btn-sm btn-primary me-2"
                      to={`/view/${stu.id}`}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No student data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetAll;
