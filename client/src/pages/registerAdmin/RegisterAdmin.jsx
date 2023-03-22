import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./registerAdmin.scss";
import axios from "axios";
import Sonik from "../../components/img/logo-sonik/sonik_bppt_color_white.png";


const RegisterAdmin = () => {
  const [inputs, setInputs] = useState({
    NAME: "",
    EMAIL: "",
    PASSWORD: "",
    role: "admin",
  });

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8800/auth/registerAdmin", inputs);
      navigate("/login");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  console.log(err);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <img src={Sonik} alt="logo" className="logo" />
          <h2>Charging Station Management System</h2>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register Admin</h1>
          <form>
            <input
              type="text"
              placeholder="Name"
              name="NAME"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="EMAIL"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="PASSWORD"
              onChange={handleChange}
            />
            {err && err}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
