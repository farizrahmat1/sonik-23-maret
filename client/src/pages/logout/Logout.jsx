import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./logout.scss";

import { useEffect } from "react";
const Logout = () => {
  const [inputs, setInputs] = useState({
    EMAIL: "",
    PASSWORD: "",
  });
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/")
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [token]);


  return (
    <div className="login">
      <p>Logout</p>
    </div>
  );
};

export default Logout;
