import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
const AddCs = () => {
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "";
  const bytes = CryptoJS.AES.decrypt(role, "10");
  const originalRole = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    if (originalRole !== "admin") navigate("/");
  }, []);
  const [chargingStation, setChargingStation] = useState({
    NAME: " ",
    charge_box_id: null,
    ENDPOINT_ADDRESS: null,
    CITY: null,
    LOCATION: null,
    LONGITUDE: null,
    LATITUDE: null,
  });

  const ocppProtocol = Object.freeze({
    1.2: "ocpp1.2J",
    1.5: "ocpp1.5J",
    1.6: "ocpp1.6J",
  });
  const registrationStatus = Object.freeze({
    PENDING: "Pending",
    ACCEPTED: "Accepted",
    REJECTED: "Rejected",
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setChargingStation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/cs", chargingStation);
      navigate("/chargingstation");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div>
      <div className="form">
        <h1>Add New Charging Station</h1>
        <input
          type="text"
          placeholder="Charging Station Name"
          name="NAME"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Charge Box ID"
          name="charge_box_id"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Endpoint Address"
          name="ENDPOINT_ADDRESS"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="City"
          name="CITY"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Location"
          name="LOCATION"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Longitude"
          name="LONGITUDE"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Latitude"
          name="LATITUDE"
          onChange={handleChange}
        />
        <div className="labelBox">
          <label>OCPP Protocol:</label>
          <select name="ocpp_protocol" onChange={handleChange}>
            {Object.keys(ocppProtocol).map((key) => (
              <option key={key} value={ocppProtocol[key]}>
                {ocppProtocol[key]}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Registration Status"
          name="registration_status"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Insert Connector Status"
          name="insert_connector_status_after_transaction_msg"
          onChange={handleChange}
        />
        <button className="add" onClick={handleClick}>
          Add
        </button>
        {error && "Something went wrong!"}
        <span className="seeallcs">
          <Link to="/chargingstation">See all Charging Station</Link>
        </span>
      </div>
    </div>
  );
};

export default AddCs;
