import Link from "next/link";
// import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
// import { useEffect } from "react";
export default function Home() {
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
    const result = await axios.post("http://localhost:3000/api/users", data);
    console.log("result", result);
    console.log(data);
    toast("Registared Successfully", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
      position: "top-right",
    });
    router.push("/login");
  };
  console.log(errors);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center w-full bg-lime-50 ">
          <div className="p-12 m-20 bg-teal-500  shadow-2xl rounded-br-xl border-stone-300 rounded-md hover:drop-shadow-2xl">
            <div className="text-center">
              <div className="text-xl font-bold underline text-white">
                Register
              </div>
            </div>
            <div className="pb-2">
              <div>
                <div className="p-1 text-base">Email address</div>
              </div>
              <input
                {...register("email", { required: true })}
                type="email"
                // value={state.email}
                // onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="Email address"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
              <p className="text-rose-700">{errors.email?.message}</p>
            </div>
            <div>Password</div>
            <div>
              <input
                type="password" // if show password is true type will be text otherwise its text
                // value={state.password}
                // onChange={(e) =>
                //   setState({ ...state, password: e.target.value })
                // }
                {...register("password", { required: true })}
                placeholder="Password"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
              <p className="text-rose-700">{errors.password?.message}</p>

              <img />
            </div>
            <div className="text-base">Confirm Password</div>

            <div>
              <input
                type="password"
                // value={state.confirmPassword}
                // onChange={(e) =>
                //   setState({ ...state, confirmPassword: e.target.value })
                // }
                {...register("confirmPassword", { required: true })}
                placeholder="Confrim Password"
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              />
              <p className="text-rose-700">{errors.confirmPassword?.message}</p>
            </div>
            <div className="text-center p-2">
              <button
                className="p-1.5 bg-white rounded-md hover:bg-sky-200"
                type="submit"
                // onClick={submitHandler}
              >
                SignUp
              </button>
            </div>
            <div>
              Already have an account ?
              <Link href="/login" className="text-blue-600 hover:text-white">
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
