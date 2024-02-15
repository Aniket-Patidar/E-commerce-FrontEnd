import Navbar from "@/components/Navbar/Navbar";
import {
  getUserInfo,
  removeAddress,
  updateProfile,
  uploadImage,
  userAddressUpdate,
} from "@/components/auth/apiCall";
import axios from "axios";

import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [editForm, setEditForm] = useState(false);
  const [Model, setModel] = useState(false);

  const [editProfile, setEditProfile] = useState({});

  const [createAddress, setCreateAddress] = useState(false);
  const { user, loadingUser,error } = useSelector((state) => state.User);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setEditProfile({
      name: user.name,
      email: user.email,
      // image: user.image,
      phoneNo: user.phoneNo,
    });
  }, []);

  function handelProfile() {
    dispatch(updateProfile(editProfile));
    setModel(false);
  }

  const onSubmit = handleSubmit((data) => {
    if (createAddress) {
      const newData = [...user.addresses, { ...data }];
      dispatch(userAddressUpdate({ addresses: newData }, user?.id));
    } else {
      const userAddress = [...user.addresses];
      const index = userAddress.findIndex((e) => {
        return e.id == data.id;
      });
      userAddress.splice(index, 1, data);
      dispatch(userAddressUpdate({ addresses: userAddress }, user?.id));
    }

    // delete userAddress[data.index]["index"];
    reset();
    setCreateAddress(false);
    setEditForm(false);
  });

  const handelAddressRemove = (index) => {
    const newData = [...user.addresses];
    newData.splice(index, 1);
    console.log(newData);
    dispatch(removeAddress({ addresses: newData }));
  };

  function handelAddressUpdate(index) {
    setEditForm(true);
    setCreateAddress(false);
    const {
      firstName,
      email,
      city,
      phone,
      lastName,
      postalCode,
      region,
      streetAddress,
    } = user.addresses[index];
    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue("email", email);
    setValue("phone", phone);
    setValue("streetAddress", streetAddress);
    setValue("region", postalCode);
    setValue("postalCode", region);
    setValue("city", city);
    setValue("index", index);
  }

  function handelCreateAddress() {
    setEditForm(!editForm);
    setCreateAddress(true);
    reset();
  }

  /* Image */
  const ref = useRef();

  function handleChange(e) {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    dispatch(uploadImage(formData));
    dispatch(getUserInfo());
  }
  function handelClickOnImage() {
    ref.current.click();
  }

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <>
      {!loadingUser ? (
        <div>
          <input
            className="hidden"
            name="avatar"
            ref={ref}
            onChange={handleChange}
            type="file"
          />

          <div className={`  text-black min-h-screen p-10 relative  `}>
            {Model && (
              <div className="absolute -translate-x-[50%] -translate-y-[50%] top-[35%] left-[50%]">
                <div className="bottom-2 rounded-lg bg-[#dadada] p-5  m-1 selection-none">
                  <div className="flex  align-middle justify-end">
                    <AiOutlineClose
                      onClick={() => setModel(false)}
                      className="cursor-pointer px-1 rounded-full bg-white text-2xl"
                    ></AiOutlineClose>
                  </div>
                  <div className="flex items-center justify-center">
                    <img className="rounded-full w[10vw]" src="./a.jpg"></img>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <input
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          [e.target.name]: e.target.value,
                        })
                      }
                      type="text"
                      name="name"
                      value={editProfile.name}
                      className="border-2 border-white text-sm mt-2 rounded-lg bg-transparent "
                      placeholder="Name"
                    />
                    <input
                      onChange={(e) => {
                        setEditProfile({
                          ...editProfile,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      type="text"
                      name="email"
                      value={editProfile.email}
                      className="border-2 border-white text-sm mt-2 rounded-lg bg-transparent "
                      placeholder="E-mail"
                    />
                    <input
                      onChange={(e) => {
                        setEditProfile({
                          ...editProfile,
                          phoneNo: e.target.value,
                        });
                      }}
                      type="text"
                      name="phoneNo"
                      className="border-2 border-white text-sm mt-2 rounded-lg bg-transparent "
                      placeholder="Phone No"
                      value={user.phoneNo}
                    />
                    <button onClick={handelProfile}>Submit</button>
                  </div>
                </div>
              </div>
            )}
            <div>
              <div className={`flex md:flex-row flex-col`}>
                <div className="w-[120px] h-[120px] overflow-hidden  rounded-full m-2">
                  <img
                    onClick={handelClickOnImage}
                    className="mr-6 rounded-full w-[120px] h-[120px] object-cover object-center"
                    src={
                      user.image
                        ? `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/${user.image}`
                        : "./placeholder.webp"
                    }
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <h1 className="mt-0 mb-2 text-black text-4xl">
                    {user?.name}
                  </h1>
                  <p className="text-gray-600 mb-2 text-sm">{user.email}</p>
                  <p className="text-gray-600 mb-2 text-sm">{user?.phoneNo}</p>
                  <p className="text-gray-600 mb-2 text-sm">
                    {user.role == "admin" && (
                      <p className="capitalize   text-red-500">{user.role}</p>
                    )}
                  </p>
                  <div>
                    <p
                      onClick={() => setModel(true)}
                      className="cursor-pointer text-sm border-2 px-2 py-1 bg-gray-600 w-fit"
                    >
                      Edit Profile
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-2 ">
                <p className="mt-1 text-sm leading-6 text-white">
                  <button
                    className="p-2 text-sm bg-green-600 rounded-full"
                    onClick={handelCreateAddress}
                  >
                    Add New Address
                  </button>
                </p>
                <div>
                  {editForm && (
                    <form
                      className="bg-white mt-12 px-5 py-10"
                      onSubmit={onSubmit}
                    >
                      <div className="space-y-12">
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                              Personal Information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Use a permanent address where you can receive
                              mail.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="first-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  First name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    {...register("firstName", {
                                      required: "please enter first name",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors?.firstName && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.firstName.message}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="last-name"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Last name
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    {...register("lastName", {
                                      required: "please enter lastName name",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors?.lastName && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.lastName.message}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-4">
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
                                    {...register("email", {
                                      required: "email id is required",
                                      pattern: {
                                        value:
                                          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "please enter valid email id",
                                      },
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors?.email && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.email.message}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-3">
                                <label
                                  htmlFor="country"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Phone
                                </label>
                                <div className="mt-2">
                                  <input
                                    id="phone"
                                    name="phone"
                                    type="number"
                                    {...register("phone", {
                                      required: "please enter phone",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                  ></input>
                                </div>
                                {errors?.phone && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.phone.message}
                                  </p>
                                )}
                              </div>

                              <div className="col-span-full">
                                <label
                                  htmlFor="street-address"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  Street address
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    {...register("streetAddress", {
                                      required: "please enter street address",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors?.streetAddress && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.streetAddress.message}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-2 sm:col-start-1">
                                <label
                                  htmlFor="city"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  City
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="city"
                                    id="city"
                                    {...register("city", {
                                      required: "please enter city",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors?.city && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.city.message}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="region"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  State / Province
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="region"
                                    id="region"
                                    {...register("region", {
                                      required: "please enter region",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors?.region && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.region.message}
                                  </p>
                                )}
                              </div>

                              <div className="sm:col-span-2">
                                <label
                                  htmlFor="postal-code"
                                  className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                  ZIP / Postal code
                                </label>
                                <div className="mt-2">
                                  <input
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    {...register("postalCode", {
                                      required: "please enter postal code",
                                    })}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  />
                                </div>
                                {errors?.postalCode && (
                                  <p className="text-sm capitalize text-red-500">
                                    {errors?.postalCode.message}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              type="button"
                              onClick={() => {
                                reset();
                                setEditForm(false);
                                setCreateAddress(false);
                              }}
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              Reset
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              {createAddress ? "create" : " Edit Address"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* ........................... */}

                  <h1 className="font-bol text-2xl  mt-8 ">Address</h1>

                  <div className="mt-0 space-y-6">
                    <ul role="list" className="divide-y divide-gray-100">
                      {user?.addresses?.map((address, index) => (
                        <li
                        key={index}
                        className="flex flex-col sm:flex-row justify-between gap-x-6 py-5"
                        >
                          <div className="flex items-center min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                          <h1>{address.firstName} {address.lastName}</h1>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.streetAddress}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                <span>{address.city}</span>
                              </p>
                            </div>
                          </div>
                          <div className=" shrink-0 sm:flex sm:flex-col sm:items-end">
                            <div>
                              <p className="text-sm leading-6 text-gray-900">
                                {address.phone}
                              </p>
                              <p className="text-sm leading-6 space-x-5 text-gray-500">
                                {/* <span>{address.region}</span> */}
                                <span>{address.postalCode}</span>
                              </p>
                              <div className="flex gap-2">
                                <p
                                  className="text-red-300  cursor-pointer text-sm capitalize hover:text-red-500"
                                  onClick={(e) => handelAddressRemove(index)}
                                >
                                  ❌
                                </p>
                                <p
                                  className="text-red-300 cursor-pointer text-sm capitalize hover:text-red-500"
                                  onClick={(e) => handelAddressUpdate(index)}
                                >
                                  ✏️
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[100%] h-[100vh] flex items-center justify-center">
          <GridLoader  color="#36d7b7"></GridLoader>
        </div>
      )}
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Profile;
