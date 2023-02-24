import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      toast.success("Registration successful");
      navigate("/login");
    }
    await axios.post("http://localhost:3000/users/register", {
      email: email,
      password: password,
    });
    console.log(
      "email :",
      email,
      "password :",
      password,
      "confirmPassword :",
      confirmPassword
    );
  };

  return (
    <layout>
      <div className="backg">
        <div className="form-container">
          <div className="form-groups">
            <form className="form">
              <h3 className="form-title">Register</h3>
              <div className="align-font">
                Email
                <br />
                <input
                  type="email"
                  className="input"
                  id="email"
                  placeholder="Enter email address"
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="align-font">
                Confirm Password
                <br />
                <input
                  type="password"
                  className="input"
                  id="cpassword"
                  placeholder="Enter confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="btn">
                <button type="button" onClick={handleSubmit}>
                  Register
                </button>
              </div>
              <div className="form-group">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="form-link">
                    Login here
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
export default Register;
