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
    try{
    const result = await axios.post("http://localhost:3001/api/signup", data)
    console.log("result", result);
    console.log(data);
    toast("Registared Successfully", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
      position: "top-right",
    });
    router.push("/login");
  }catch(error){
    console.log(error)
    toast("Email already in user or Password",{
      hideProgressBar: true,
      autoClose: 2000,
      type: "error",
      position: "top-right",
    });
  }
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
        <div className="flex justify-center items-center w-full bg-teal-50">
          <img className="m-20"src="https://posbytz.s3.ap-south-1.amazonaws.com/partners/1/image_1630190079464.png" alt="image"/>
          <div className="p-4 m-20 border-solid border-2 border-grey-600 rounded bg-white ">
            <div className="">
              <div className="text-2xl mb-4">
                Register Account
              </div>
              <div className="text-sm">
                  <p className="text-neutral-500 mb-4">Free on-boarding support. No credit card required.</p>
              </div>
            </div>
            <div className="pb-2">
              <input
                {...register("email", { required: true })}
                type="email"
                // value={state.email}
                // onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder="Your Email"
                className="mt-1 px-3 py-3 w-96 bg-white border shadow-sm border-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 block w-full rounded  sm:text-sm focus:ring-1"
              />
            </div>
              {<p className="text-rose-700">{errors.email?.message}</p>}
            <div>
              <input
                type="password" // if show password is true type will be text otherwise its text
                // value={state.password}
                // onChange={(e) =>
                //   setState({ ...state, password: e.target.value })
                // }
                {...register("password", { required: true })}
                placeholder="Password"
                className="mt-5 px-3 py-3 bg-white border border-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 block w-full rounded  sm:text-sm focus:ring-1"
              />
               {<p className="text-rose-700">{errors.password?.message}</p>}
              <img />
            </div>
            <div>
              <input
                type="password"
                // value={state.confirmPassword}
                // onChange={(e) =>
                //   setState({ ...state, confirmPassword: e.target.value })
                // }
                {...register("confirmPassword", { required: true })}
                placeholder="Confrim Password"
                className="mt-5 px-3 py-3 bg-white  border shadow-sm border-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 block w-full rounded sm:text-sm focus:ring-1"
              />
              <p className="text-rose-700">{errors.confirmPassword?.message}</p>
            </div>
            <div className="mt-9">
              <button
                className="bg-orange-600 px-3 py-3 w-full rounded text-white hover:bg-orange-700"
                type="submit"
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
//https://posbytz.s3.ap-south-1.amazonaws.com/partners/1/image_1630190079464.png
{/* <div class="bg-no-repeat bg-left ..." style="background-image: url(...);"></div> */}
