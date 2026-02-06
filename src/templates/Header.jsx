import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="container-fluid bg-dark text-white py-3 px-4 d-flex justify-content-between align-items-center">
      <h1 className="mb-0">StudentManagementApp 06/02/2026</h1>
      <div>
        <Link className="btn btn-outline-light me-2" to={"/add"}>
          Add Student
        </Link>
        <Link className="btn btn-outline-light me-2" to={"/view"}>
          View Student
        </Link>
        <Link className="btn btn-outline-light me-2" to={"/login"}>
          Login
        </Link>
      </div>
    </div>
  );
}

export default Header;
