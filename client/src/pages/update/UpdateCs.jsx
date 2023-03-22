import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import CryptoJS from "crypto-js";

const UpdateCs = () => {
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

  useEffect(() => {
    if (role !== "admin") navigate("/");
  }, []);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const location = useLocation();

  const csId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setChargingStation((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8800/cs/${csId}`, chargingStation);
      navigate("/chargingstation");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };
  const getCs = async () => {
    const response = await axios.get(
      `http://localhost:8800/cs/${csId}`,
      chargingStation
    );
    setChargingStation(response.data);
  };

  return (
    <div className="form">
      <h1>Update Charging Station</h1>
      <input
        type="text"
        placeholder="Charging Station Name"
        value={chargingStation.NAME}
        name="NAME"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Charge Box ID"
        name="charge_box_id"
        value={chargingStation.charge_box_id}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Endpoint Address"
        name="ENDPOINT_ADDRESS"
        value={chargingStation.ENDPOINT_ADDRESS}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="City"
        name="CITY"
        value={chargingStation.CITY}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Location"
        name="LOCATION"
        value={chargingStation.LOCATION}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Longitude"
        name="LONGITUDE"
        value={chargingStation.LONGITUDE}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Latitude"
        name="Latitude"
        value={chargingStation.LATITUDE}
        onChange={handleChange}
      />
      <button className="updatePageButton" onClick={handleClick}>
        Update
      </button>
      {error && "Something went wrong!"}
      <Link to="/chargingstation">See all Charging Station</Link>
    </div>
  );
};

export default UpdateCs;
