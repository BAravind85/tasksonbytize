import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/users/login", {
        email,
        password,
      });
      navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Logged in successfully");
      console.log("email :", email, "password :", password);
    } catch (err) {
      toast.error("Email or Password incorrect");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      localStorage.getItem("userInfo");
      // navigate("/");
    }
  });

  return (
    <layout>
      <div className="backg">
        <div className="form-container">
          <div className="form-groups">
            <form className="form">
              <h3 className="form-title">LogIn</h3>
              <div className="align-font">
                Email
                <br />
                <input
                  type="email"
                  className="input"
                  id="email"
                  placeholder="Enter email address"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="align-font">
                Password
                <br />
                <input
                  type="password"
                  className="input"
                  id="password"
                  placeholder="Enter password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button type="button" onClick={handleSubmit}>
                  Login
                </button>
              </div>
              <div className="form-group">
                <p>
                  You don't have an account ?{" "}
                  <Link to="/register" className="form-link">
                    Register here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </layout>
  );
};

export default Login;
