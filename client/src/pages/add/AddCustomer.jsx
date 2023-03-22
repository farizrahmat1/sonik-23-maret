import React from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./add.css";
import { useEffect } from "react";
import CryptoJS from "crypto-js";
const AddCustomer = () => {
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
    ocpp_tag_pk: " ",
    id_tag: " ",
    expiry_date: " ",
    max_active_transaction_count: "",
    EMAIL: " ",
    ADDRESS: " ",
    PHONE_NUMBER: " ",
  });

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/customer", customer);
      navigate("/customer");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div>
      <div className="form">
        <h1>Add New Customer</h1>
        <input
          type="text"
          placeholder="Customer Name"
          name="NAME"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="OCPP Tag PK"
          name="ocpp_tag_pk"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="ID Tag Customer"
          name="id_tag"
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          placeholder="ID Tag Expiry date"
          name="expiry_date"
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Max Active Transaction Count"
          name="max_active_transaction_count"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Customer Email"
          name="EMAIL"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Customer Address"
          name="ADDRESS"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Customer Phone Number"
          name="PHONE_NUMBER"
          onChange={handleChange}
        />
        <button className="add" onClick={handleClick}>
          Add
        </button>
        {error && "Something went wrong!"}
        <Link to="/customer">See all Customer</Link>
      </div>
    </div>
  );
};

export default AddCustomer;
