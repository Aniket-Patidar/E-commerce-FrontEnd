import Link from "next/link";
import React, { use, useEffect } from "react";
import { useForm, Resolver } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { sendMail } from "@/components/auth/apiCall";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GridLoader } from "react-spinners";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user, error, LoginUser, emailSend, loadingUser } = useSelector(
    (state) => state.User
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = handleSubmit((data) => {
    dispatch(sendMail(data));
  });

  useEffect(() => {
    if (emailSend == true) {
      toast.success("check your email");
    }
  }, [emailSend]);
  useEffect(() => {
    if (error) {
      toast.success(error);
    }
  }, [error]);

  return (
    <div>
      {loadingUser ? (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
          <GridLoader color="#36d7b7"></GridLoader>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
            src="./ecommerce.png"

              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Forgot Password
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: "email id is required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "please enter valid email id",
                      },
                    })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors?.email && (
                    <p className="text-sm capitalize text-red-500">
                      {errors?.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  submit
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              want to Login{" "}
              <Link
                href="/loginPage"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}

      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
