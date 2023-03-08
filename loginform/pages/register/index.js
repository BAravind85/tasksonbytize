import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Image from "next/image";
import eye_image from "../home/eye.png";
import eye_slash from "../home/eye_slash.png";

// import { useEffect } from "react";
export default function Home() {
  const [inputtext, setinputtext] = useState({
    email: "",
    password: "",
  });
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");
  const [type, settype] = useState(false);

  //
  const router = useRouter();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(4, "password should be at least 4 characters")
      .max(9, "password should be at least 12 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .min(4, "password should be at least 4 characters")
      .max(9, "password should be at least 12 characters")
      .oneOf([yup.ref("password")], "Password does not match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm(formOptions);
  const onSubmit = async (data) => {
    try {
      const result = await axios.post("http://localhost:3001/api/signup", data);
      console.log("result", result);
      console.log(data);
      toast("Registared Successfully", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
        position: "top-right",
      });
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast("Email already in use or Password", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
        position: "top-right",
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
  //   confirmPassword: "",
  // });
  // const submitHandler = async () => {
  //   const result = await axios.post("http://localhost:3000/api/hello");
  //   console.log("result", result);
  //   console.log(state);
  // };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit) }
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
          <div className="p-15 pt-10">
            <div className="mt-10 mb-4">
              <img
                className="object-cover h-20 w-25"
                src="https://posbytz.s3.ap-south-1.amazonaws.com/partners/1/logo_1630189049088.png"
                alt="header"
              />
            </div>
            <div className="p-6  w-96 border-solid border-2 border-grey-600 rounded bg-white ">
              <div className="">
                <div className="text-2xl mb-4">Register Account</div>
                <div className="text-sm">
                  <p className="text-neutral-500 mb-4">
                    Free on-boarding support. No credit card required.
                  </p>
                </div>
              </div>
              <div className=" ">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Your Email"
                  className={`mt-4 px-3 py-3 bg-white border border-slate-300 placeholder-slate-600 focus:outline-none ${
                    errors.email ? "border-red-500 ring-red-500 " : "ring-indigo-600 focus:ring-2"
                  } block w-full rounded sm:text-sm`}
                />
              </div>
              {<p className="text-red-600 text-sm">{errors.email?.message}</p>}
              <div className="flex">
                <input
                  type={password}
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className={`mt-4 px-3 py-3 bg-white border border-slate-300 placeholder-slate-600 focus:outline-none ${
                    errors.password ? "border-red-500 ring-red-500 " : "ring-indigo-600 focus:ring-2"
                  } block w-full rounded-l-lg   sm:text-sm `}
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
              <div>
                <input
                  type={password}
                  {...register("confirmPassword", { required: true })}
                  placeholder="Confrim Password"
                  className={`mt-4 px-3 py-3 bg-white border border-slate-300 placeholder-slate-600 focus:outline-none ${errors.password ? "border-red-500 ring-red-500" : "ring-indigo-600 focus:ring-2"} block w-full rounded sm:text-sm`}
                />
                <p className="text-red-600 text-sm">
                  {errors.confirmPassword?.message}
                </p>
              </div>
              <div className="text-sm mt-9">
                By clicking register,I accept the&nbsp;
                <Link href="https://posbytz.com/terms-and-conditions/" className="text-indigo-900">
                  Terms & Conditions
                </Link>
              </div>
              <div className="mt-3">
                <button
                  className="bg-orange-500 px-3 py-3 w-full rounded text-white hover:bg-orange-600"
                  type="submit"
                >
                  SignUp
                </button>
              </div>
            </div>
            <div className="flex justify-center  mt-4 ">
              Already have an account ? &nbsp;
              <Link
                href="/login"
                className="text-blue-600 hover:text-indigo-700"
              >
                {" "}
                Login here
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
