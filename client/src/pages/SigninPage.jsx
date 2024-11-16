/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "../styles/SigninPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import AuthenticateToken from "../utils/TokenValidation";
import { toast, Bounce } from "react-toastify";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  if (AuthenticateToken()) {
    //window.location.href = "/";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        rememberme: remember,
      });

      const { access_token } = response.data;

      const decodedToken = jwtDecode(access_token);

      const expiration = decodedToken.exp
        ? new Date(decodedToken.exp * 1000)
        : 0;

      Cookies.set("token", access_token, { expires: expiration });

      toast.success("Login successful! Welcome back!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        onClose: () => navigate("/home"),
      });
    } catch {
      toast.error(
        "Login failed. Please check your credentials and try again.",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
    }
  };

  return (
    <div className="page">
      <div className="form">
        <div className="formContent">
          <h1>Welcome Back!</h1>
          <p className="forminstruction">
            Enter your credentials to access your account
          </p>
          <form className="formContent" onSubmit={handleSubmit}>
            <label className="inputLabel">Email Address</label>
            <input
              value={email}
              className="input"
              type="text"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            ></input>

            <label className="inputLabel">Password</label>
            <input
              value={password}
              className="input"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            ></input>

            <div className="rememberme">
              <p>Remember for 30 days</p>
              <input
                value={remember}
                type="checkbox"
                id="terms-checkbox"
                onChange={(e) => {
                  setRemember(e.target.checked);
                }}
              />
            </div>

            <button type="submit" id="btnSignin">
              Login
            </button>
          </form>

          <div className="OrText">
            <p>Or</p>
          </div>
          <div className="outsideSignups">
            <button>
              <FontAwesomeIcon className="brand" icon={faGoogle} />
              Sign in with Google
            </button>
            <button>
              <FontAwesomeIcon className="brand" icon={faApple} />
              Sign in with Apple
            </button>
          </div>
          <div className="SingInRedirection">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="leftSideImage"></div>
    </div>
  );
}
