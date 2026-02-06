import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function StudentForm() {
  const { register, handleSubmit, reset } = useForm();

  const saveForm = (data) => {
    const formData = new FormData();

    const studentData = {
      name: data.name,
      rollNumber: data.rollNumber,
      age: data.age,
      username: data.username,
      password: data.password,
      address: {
        street: data.street,
        city: data.city,
        zipCode: data.zipCode,
      },
    };

    formData.append("student", JSON.stringify(studentData));

    formData.append("image", data.imageDocument[0]);
    console.log(data.imageDocument[0]);

    formData.append("pdf", data.pdfFile[0]);
    console.log(data.pdfFile[0]);

    axios
      //.post("http://localhost:8080/api/v1/save", formData)
      .post("http://localhost:8080/ReactAppBackend-0.0.1-SNAPSHOT/api/v1/save", formData)
      .then((response) => {
        console.log(response.data);
        alert("Data Added");
        reset();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Student Information</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(saveForm)}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input {...register("name")} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Roll Number</label>
              <input
                {...register("rollNumber")}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                {...register("age")}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Enter Username:
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                {...register("username")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Enter Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                {...register("password")}
              />
            </div>

            <h5 className="mt-4">Address</h5>

            <div className="mb-3">
              <label className="form-label">Street</label>
              <input
                {...register("street")}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">City</label>
              <input {...register("city")} className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input
                {...register("zipCode")}
                className="form-control"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Upload Image Document</label>
              <input
                type="file"
                {...register("imageDocument")}
                className="form-control"
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Upload Pdf File</label>
              <input
                type="file"
                {...register("pdfFile")}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;
