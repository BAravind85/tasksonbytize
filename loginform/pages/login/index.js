import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import eye_image from "../home/eye.png";
import eye_slash from "../home/eye_slash.png";

export default function Login() {
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");

  const router = useRouter();
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const onSubmit = async (data) => {
    try {
      const result = await axios.post("http://localhost:3001/api/login", data);
      console.log("result", result);
      console.log(data);
      toast("Login Successfully", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "top-right",
      });
      router.push("/home");
    } catch (error) {
      console.log(error);
      toast("Email already in user or Password", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
        position: "top-center",
      });
    }
  };
  console.log(errors);

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
    } else {
      setpassword("password");
      seteye(true);
    }
  };
  // const [state, setState] = useState({
  //   email: "",
  //   password: "",
  // });
  // const submitHandler = async () => {
  //   console.log(state);
  // };
  // const fetchComments = async () => {
  // const data = await res.json();
  // setComments(data);
  // };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center w-full bg-teal-50"
      >
        <div className="flex pr-20">
          <div className="m-20">
            <img
              className="pr-20"
              src="https://posbytz.s3.ap-south-1.amazonaws.com/partners/1/image_1630190079464.png"
              alt="image"
            />
          </div>
          <div className="p-15 pt-14 ">
            <div className="mt-10 mb-4">
              <img
                className="object-cover h-20 w-25"
                src="https://posbytz.s3.ap-south-1.amazonaws.com/partners/1/logo_1630189049088.png"
                alt="header"
              />
            </div>
            <div className="p-6  w-full border-solid border-2 border-grey-600 rounded bg-white ">
              <div className="">
                <div className="text-2xl mb-4">Welcome Back!</div>
                <div className="text-sm">
                  <p className="text-neutral-500 mb-4">
                    Login to your dashboard with your username and password.
                  </p>
                </div>
              </div>
              <div className=" ">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Your Email"
                  className={`mt-4 px-3 py-3 bg-white border border-slate-300 placeholder-slate-600 focus:outline-none ${
                    errors.email ? "border-red-600 " : ""
                  } block w-full rounded focus:border-indigo-600 ring-indigo-600  sm:text-sm focus:ring-1`}
                />
              </div>
              {<p class="text-red-600 text-sm">{errors.email?.message}</p>}
              <div className="flex">
                <input
                  type={password}
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className={`mt-4 px-3 py-3 bg-white border border-slate-300 placeholder-slate-600 focus:outline-none ${
                    errors.password ? "border-red-600 " : ""
                  } block w-full rounded-l-lg  focus:border-indigo-600 ring-indigo-600  sm:text-sm focus:ring-1`}
                />
                <div className="flex justify-center items-center w-12 bg-orange-600 mt-4 rounded-r-lg  hover:bg-orange-700">
                  {eye ? (
                    <Image
                      className="object-cover w-6 "
                      onClick={Eye}
                      src={eye_slash}
                      alt="eye_image"
                    />
                  ) : (
                    <Image
                      className="object-cover w-6 "
                      onClick={Eye}
                      src={eye_image}
                      alt="eye_image"
                    />
                  )}
                </div>
              </div>
              {
                <p className="text-red-600 text-sm">
                  {errors.password?.message}
                </p>
              }

              <p className="text-sm mt-5 text-indigo-800">Forgot Password?</p>
              <div className="mt-9">
                <button
                  className="bg-orange-500 px-3 py-3 w-full rounded text-white hover:bg-orange-600"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="flex justify-center  mt-4 ">
              Don't have an account ? &nbsp;
              <Link
                href="/register"
                className="text-blue-600 hover:text-indigo-600"
              >
                {" "}
                Register now!
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
//class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
