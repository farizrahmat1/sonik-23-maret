import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./update.css";
import CryptoJS from "crypto-js";
const UpdateCustomer = () => {
  const role = localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role"))
    : "";
  const bytes = CryptoJS.AES.decrypt(role, "10");
  const originalRole = bytes.toString(CryptoJS.enc.Utf8);

  useEffect(() => {
    if (originalRole !== "admin") navigate("/");
  }, []);

  const [customer, setCustomer] = useState({
    NAME: " ",
    ID_TAG: " ",
    EMAIL: " ",
    KTP: " ",
  });
  const [error, setError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const customerId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    // setForm({...form, [e.target.name] : e.target.value});
    setCustomer((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8800/customer/${customerId}`,
        customer
      );
      navigate("/customer");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const getCustomer = async () => {
    const response = await axios.get(
      `http://localhost:8800/customer/${customerId}`,
      customer
    );
    setCustomer(response.data);
    // setName(response.data.NAME);
    // setIDTag(response.data.ID_TAG);
    // setEmail(response.data.EMAIL);
    // setKTP(response.data.KTP);
  };

  return (
    <div className="form">
      <h1>Update Customer</h1>
      <input
        type="text"
        placeholder="Customer Name"
        name="NAME"
        value={customer.NAME}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="ID Tag Customer"
        name="ID_TAG"
        value={customer.ID_TAG}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Customer Email"
        name="EMAIL"
        value={customer.EMAIL}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Customer KTP ID"
        name="KTP"
        value={customer.KTP}
        onChange={handleChange}
      />
      <button className="updatePageButton" onClick={handleClick}>
        Update
      </button>
      {error && "Something went wrong!"}
      <Link to="/customer">See all Customer</Link>
    </div>
  );
};

export default UpdateCustomer;
