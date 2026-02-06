import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [base64Image, setBase64Image] = useState(null);
  const [base64Pdf, setBase64Pdf] = useState(null);

  const editStudent = (data) => {
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

    formData.append("pdf", data.pdfFile[0]);

    axios
      //.put(`http://localhost:8080/api/v1/update/${id}`, formData)
      .put(`http://localhost:8080/ReactAppBackend-0.0.1-SNAPSHOT/api/v1/update/${id}`, formData)
      .then((response) => {
        console.log(response.data);
        reset();
        setBase64Image(null);
        setBase64Pdf(null);
        alert("Student Updated");
        navigate("/view");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const getSingledata = () => {
    //axios.get(`http://localhost:8080/api/v1/getSingle/${id}`)
    axios.get(`http://localhost:8080/ReactAppBackend-0.0.1-SNAPSHOT/api/v1/getSingle/${id}`)
    .then((res) => {
      if (res.status === 200) {
        const student = res.data;

        for (const key in student) {
          setValue(key, student[key]);
        }

        for (const key in student.address) {
          setValue(key, student.address[key]);
        }

        const imageUrl = `data:image/jpeg;base64,${student.address.imageDocument}`;
        setBase64Image(imageUrl);

        const pdfUrl = `data:application/pdf;base64,${student.address.pdfFile}`;
        setBase64Pdf(pdfUrl);
      }
    });
  };

  useEffect(getSingledata, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Student Information</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(editStudent)}>
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

            {base64Image && (
              <div className="mb-3">
                <label className="form-label">Current Image</label>
                <br />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    const newWindow = window.open();
                    if (newWindow) {
                      newWindow.document.write(
                        `<img src="${base64Image}" style="max-width:100%; height:auto;"/>`
                      );
                    }
                  }}
                >
                  View Full Image
                </button>
              </div>
            )}

            <div className="mb-4">
              <label className="form-label">Upload New Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("imageDocument")}
                className="form-control"
              />
            </div>

            {base64Pdf && (
              <div className="mb-3">
                <label className="form-label">Current PDF File</label>
                <br />
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => {
                    const newWindow = window.open();
                    if (newWindow) {
                      newWindow.document.write(
                        `<iframe src="${base64Pdf}" width="100%" height="100%" style="border:none;"></iframe>`
                      );
                    }
                  }}
                >
                  View PDF
                </button>
              </div>
            )}

            <div className="mb-4">
              <label className="form-label">Upload New PDF</label>
              <input
                type="file"
                accept="application/pdf"
                {...register("pdfFile")}
                className="form-control"
              />
            </div>

            <button type="submit" className="btn btn-success">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditStudent;
