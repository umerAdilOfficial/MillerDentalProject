import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AddDentist() {
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [image, setImage] = useState("");
  const [availableDays, setAvailableDays] = useState("");
  const [availableTime, setAvailableTime] = useState("");
  const [experience, setExperience] = useState("");
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");

  const handleNewDentist = async () => {
    const token = localStorage.getItem("token");
    setExperience(`${years} Y And ${months} M`);

    console.log(experience);
    try {
      if (!name || !speciality || !availableDays || !availableTime || !image) {
        alert("All Fields Are Required");
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/dentists/addDentist",
        {
          name,
          speciality,
          experience,
          availableDays,
          availableTime,
          image,
        },
        {
          headers: {
            "auth-token": token,
          },
        },
      );
    } catch (error) {
      console.log("error :", error.response?.data);
      alert("error :", error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
      <h2 className="mb-5">Add New Dentist</h2>
      <div className="container w-50 ">
        <div className="input-group mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            placeholder="Dentist Name"
            aria-label="Dentist Name"
            aria-describedby="basic-addon1"
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="form-control"
            placeholder="speciality"
            aria-label="speciality"
            aria-describedby="basic-addon2"
          />
        </div>

        <div className="input-group mb-3 mt-3">
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="input-group mb-3">
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="form-control"
            placeholder="Experinece Years"
            aria-label="Experinece Years"
            min="0"
          />
          <span className="input-group-text">Years</span>
          <input
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="form-control"
            placeholder="Experinece Months"
            aria-label="Experinece Months"
            min="0"
            max="11"
          />
          <span className="input-group-text">Months</span>
        </div>

        <div className="input-group mb-3">
          <input
            type="text"
            value={availableDays}
            onChange={(e) => setAvailableDays(e.target.value)}
            className="form-control"
            placeholder="Avaiable Days"
            aria-label="Avaiable Days"
            aria-describedby="basic-addon2"
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            value={availableTime}
            onChange={(e) => setAvailableTime(e.target.value)}
            className="form-control"
            placeholder="Avaiable Time"
            aria-label="Avaiable Time"
            aria-describedby="basic-addon2"
          />
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/dentists">
            <button type="button" className="btn btn-primary m-3">
              Back
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-primary m-3"
            onClick={handleNewDentist}
          >
            Add Dentist
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddDentist;
