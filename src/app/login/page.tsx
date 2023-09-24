"use client";
import React, { useState } from "react";

import { useForm } from "react-hook-form";
import Image from "next/image";
import Head from "next/head";

// 自定义的import
import useStyles from "./login_style";

interface LoginFormData {
  password: string;
  email: string;
}
function Error({ message }: { message: string }) {
  return <div className=" bg-red-50 p-1 text-red-600">{message}</div>;
}
function LoginPage() {
  const { styles, cx } = useStyles();

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  function onValueChange(field: keyof LoginFormData): React.ChangeEventHandler {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [field]: event.target.value,
      });
    };
  }

  const onSubmit = (data: LoginFormData) => {
    console.log("Form was submitted! data: =" + JSON.stringify(data, null, 2));
  };

  const { register, handleSubmit, formState } = useForm<LoginFormData>();
  const { errors } = formState;
  return (
    <>
      <Head>
        <title>Login Management</title>
      </Head>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            width={47}
            height={40}
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={onValueChange("email")}
                  className="block w-full rounded-md border-0 px-2 py-1.5 
                text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ref={
                    register("email", {
                      required: { value: true, message: "Email Required" },
                    }).ref
                  }
                />
                {errors.email && <Error message={errors.email.message!} />}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  autoComplete="current-password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "password can not be empty",
                    },
                  })}
                  onChange={onValueChange("password")}
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <Error message={errors.password.message!} />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 
              text-sm font-semibold leading-6 text-white shadow-sm 
              hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
              focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
