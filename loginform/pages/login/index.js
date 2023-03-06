import Link from "next/link";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import axios from "axios";  
import { toast } from "react-toastify";

export default function Login() {
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
    try{
    const result = await axios.post("http://localhost:3001/api/login", data)
    console.log("result", result);
    console.log(data);
    toast("Login Successfully", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
      position: "top-right",
    });
    router.push("/home");
  }catch(error){
    console.log(error)
    toast("Email already in user or Password",{
      hideProgressBar: true,
      autoClose: 2000,
      type: "error",
      position: "top-center",
    });
  }
  };
  console.log(errors);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center w-full bg-lime-50 ">
          <div className="p-12 m-20 bg-cyan-500  h-96 shadow-2xl rounded-br-xl border-stone-300 rounded-md hover:drop-shadow-2xl">
            <div className="text-center">
              <div className="text-xl font-bold underline text-white">
                Login
              </div>
            </div>
            <div className="pb-2">
              <div>
                <div className="p-1 text-base ">Email address</div>
              </div>
              <input
                type="email"
                {...register("email", { required: true })}
                // value={state.email}
                // onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="Email address"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
              <p className="text-rose-700">{errors.email?.message}</p>
            </div>
            <div className="space-y-6">Password</div>
            <div>
              <input
                type="password"
                {...register("password", { required: true })}
                // value={state.password}
                // onChange={(e) => setState({ ...state, password: e.target.value })}
                placeholder="Password"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
              <p className="text-rose-700">{errors.password?.message}</p>
            </div>
            <div className="text-center p-2">
              <button
                type="submit"
                className="h-full w-20 p-1 bg-white rounded-md hover:bg-sky-200"
                // onClick={onSubmit}
              >
                SignIn
              </button>
            </div>
            <div>
              You don't have an account ?
              <Link href="/register" className="text-blue-600 hover:text-white">
                {" "}
                Register here
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
//class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
