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
import nc from 'next-connect'
import { useEffect } from 'react';
import session from '../session';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");

  const router = useRouter();
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be valid")
      .required("❗Email id is required"),
    password: yup
      .string()
      .required("❗Password is required")
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
      setLoading(true);
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
        setLoading(false);
      toast("Email or password incorrect", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
        position: "top-center",
      });
    }
  };
  // console.log(errors);

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
  console.log('errors', errors)
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
          <div className="p-15">
            <div className="mt-10 mb-4">
              <img
                className="object-cover h-20 w-25"
                src="https://posbytz.s3.ap-south-1.amazonaws.com/partners/1/logo_1630189049088.png"
                alt="header"
              />
            </div>
            <div className="p-6 w-full border-solid border-2 border-grey-600 rounded bg-white ">
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
                  className={`apperence-none mt-4 px-3 py-3 bg-white border border-slate-300 placeholder-slate-600 focus:outline-none ${
                    errors.email
                      ? "border-pink-500 ring-red-500"
                      : "ring-indigo-600 focus:ring-2"
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
                    errors.password
                      ? "border-pink-500 ring-pink-500"
                      : "ring-indigo-600 focus:ring-2"
                  } block w-full rounded-l-lg sm:text-sm`}
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
                  disabled={loading}
                  className="bg-orange-500 px-3 py-3 w-full rounded text-white hover:bg-orange-600"
                  type="submit"
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      class="w-6 h-6 ml-36 text-white-200 animate-spin dark:text-orange-600 fill-slate-50"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  ) : (
                    <span>Login</span>
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-center  mt-4 ">
              `Don't have an account ? &nbsp;
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

export async function getServerSideProps(context){
  // const router = useRouter()
  await nc().use(session).run(context.req,context.res)
  const req = context.req.session
  console.log('req',req)

  //  context.req.session.destroy()
  // return {
  //   props:{
    
  //   }
  // }
 
 
  if(req.user || req.token){
    console.log('success')
    return{
      props:{
        logout:false,
        
      },
      redirect:{
        destination:'/home'
      }
    }
  }else{
    console.log('failed in login')
    return{
      props:{
        logout:true,
      },
    }
  }
}
//class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
