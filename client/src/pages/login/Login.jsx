import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.scss";
import Sonik from "../../components/img/logo-sonik/sonik_bppt_color_white.png";
import { useEffect } from "react";


const Login = () => {
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
      // console.log("login =>", inputs)
      const auth = await login(inputs);
      if (auth) {
        // console.log("token =>", auth.token);
        // console.log("role =>", auth.role);
        localStorage.setItem("token", JSON.stringify(auth.token));
        localStorage.setItem("role", JSON.stringify(auth.role));
      } else {
        alert("Login Failed");
      }
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      // console.log(token);
      navigate("/");
    }
    if (!token) {
      // console.log("loginfirst");
    }
  }, [token]);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <img src={Sonik} alt="logo" className="logo" />
          <h2>Charging Station Management System</h2>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
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
            <button onClick={(e) => handleLogin(e)}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
