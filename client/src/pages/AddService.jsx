import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddService() {
  const [serviceName, setServiceName] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const addService = async () => {
    const token = localStorage.getItem("token");
    try {
      if (!serviceName || !price || !duration || !description) {
        alert("All fields are required !!");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/services/addService",
        {
          serviceName,
          duration,
          description,
          price,
        },
        {
          headers: {
            "auth-token": token,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.log("Error : ", error.response.data);
      alert("error : ", error.response.data);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
      <h2 className="mb-5">Add New Service</h2>
      <div className="container w-50 ">
        <div className="input-group mb-3">
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            className="form-control"
            placeholder="Service Name"
            aria-label="Service Name"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="input-group mb-3 d-flex">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-control"
            placeholder="Price"
            aria-label="Price"
            aria-describedby="basic-addon2"
          />

          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="form-control"
            placeholder="Duration"
            aria-label="Duration"
            aria-describedby="basic-addon2"
          />
        </div>

        <div className="form-floating">
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Description</label>
        </div>

        <div className="d-flex justify-content-end">
          <Link to="/services">
            <button type="button" className="btn btn-primary m-3">
              Back
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-primary mb-3 mt-3 ml-3"
            onClick={addService}
          >
            Add Service
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddService;
