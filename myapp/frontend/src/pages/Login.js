import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import Input from "../component/input";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const router = useRouter();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email id is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "Password must be at least 4 characters")
      .max(9, "Password must be at least 12 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, formState, handleSubmit } = useForm(formOptions);
  const { errors } = formState;


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/users/login", {
      // email,
      // password
      });
      navigate("/");
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Logged in successfully");
      // console.log("email :", email, "password :", password);
    } catch (err) {
        toast.error('Email or password is incorrect')
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      localStorage.getItem("userInfo");
      // navigate("/");
    }
  });

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <layout>
          <div className="backg">
            <div className="form-container">
              <div className="form-groups">
                  <h3 className="form-title">LogIn</h3>
                  <div className="align-font">
                    Email
                    <br />
                    <input
                      type="email"
                      {...register("email", { required: true })}
                      className="input"
                      // id="email"
                      placeholder="Enter email address"
                      // required
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="valid">{errors.email?.message} </p>
                    {/* <Input className="input" placeholder="Enter email" type="email" {...register("email", { required: true })}/> */}
                    {/* <p className="">{errors.email?.message}</p> */}
                  </div>
                  <div className="align-font">
                    Password
                    <br />
                    <input
                      type="password"
                      {...register("password", { required: true })}
                      className="input"
                      // id="password"
                      placeholder="Enter password"
                      // required
                      // onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="valid">{errors.password?.message}</p>
                  </div>

                  <div>
                    <button type="submit">Login</button>
                  </div>
                  <div className="form-group">
                    <p>
                      You don't have an account ?{" "}
                      <Link to="/register" className="form-link">
                        Register here
                      </Link>
                    </p>
                  </div>
              </div>
            </div>
          </div>
        </layout>
      </form>
    </>
  );
};

export default Login;
//http://localhost:3000/users/login
