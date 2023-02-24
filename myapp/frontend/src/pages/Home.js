import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState();
  const [roll_no, setRoll_no] = useState();
  const [studied, setStudied] = useState();
  const [address, setAddress] = useState();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/users/home", {
      name,
      roll_no,
      studied,
      address,
    });
    navigate("/list");
    toast.success("Registed successfully");
    console.log(
      "name :",
      name,
      "roll_no :",
      roll_no,
      "studied :",
      studied,
      "address :",
      address
    );
  };
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    }
  });
  return (
    <layout>
      <div className="backg">
        <div className="form-container">
          <div className="form-groups">
            <form className="form">
              <h3 className="form-title">Register Student List</h3>
              <div className="align-font">
                Name
                <br />
                <input
                  type="name"
                  className="input"
                  id="name"
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="align-font">
                Roll Number
                <br />
                <input
                  type="Number"
                  className="input"
                  id="number"
                  placeholder="Enter Roll Number"
                  onChange={(e) => setRoll_no(e.target.value)}
                  required
                />
              </div>
              <div className="align-font">
                Studied
                <br />
                <input
                  type="studied"
                  className="input"
                  id="studied"
                  placeholder="Which class"
                  onChange={(e) => setStudied(e.target.value)}
                  required
                />
              </div>
              <div className="align-font">
                Address
                <br />
                <input
                  type="text"
                  className="input"
                  id="text"
                  placeholder="Enter sudent address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="btn">
                <button type="button" onClick={handleSubmit}>
                  Register
                </button>
              </div>
              {/* <div className="form-group">
              <p>
                Already have an account ?{" "}
                <Link to="/login" className="form-link">
                  Login here
                </Link>
              </p>
            </div> */}
            </form>
          </div>
        </div>
      </div>
    </layout>
  );
};
export default Home;
