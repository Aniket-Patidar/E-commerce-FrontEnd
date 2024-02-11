import React, { useState, Fragment, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getUserAllCard,
  removeItem,
  removeAllCard,
} from "@/components/card/ApiCall";
import { useForm } from "react-hook-form";
import { AycSetOrder } from "@/components/order/apiCall";
import { userAddressUpdate } from "@/components/auth/apiCall";

const CheackOutPage = () => {
  const [open, setOpen] = useState(true);
  const { AllCard: items } = useSelector((state) => state.Card);
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch();
  const router = useRouter();

  // TODO
  // useEffect(() => {
  //   dispatch(getUserAllCard(user?.id));
  // }, [removeItem, handelUpdate]);

  const totalItem = items.reduce((accumulator, currentValue) => {
    return accumulator + 1 * currentValue.quantity;
  }, 0);
  const totalPrice = items.reduce((accumulator, currentValue) => {
    // multiply quentiy in price
    return accumulator + currentValue.quantity * currentValue.product.price;
  }, 0);

  function handelRemover(e, item) {
    e.preventDefault();
    dispatch(removeItem(item.id));
  }
  /* handel update qty */
  function handelUpdate(e, item) {
    dispatch(updateItem({ ...item, quantity: e.target.value }));
  }

  /* handel form */
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    dispatch(userAddressUpdate({ addresses: [...user.addresses, data] }));
    reset();
  });

  const [Address, setAddress] = useState();
  const [payment, setPayment] = useState("cash");
  const { currentOrder } = useSelector((state) => state.Order);

  /* handelOrder */
  function handelOrder(e) {
    if (!Address) {
      alert("please select address");
    }

    if (Address) {
      const orderDetails = {
        user: user?.id,
        items,
        selectedAddress: Address,
        totalAmount: totalItem,
        totalItems: totalPrice,
        paymentMethod: payment,
      };

      dispatch(AycSetOrder(orderDetails));

      items.forEach((element) => {
        dispatch(removeItem(element?.id));
      });
      router.push("/OderSuccessfull/" + currentOrder?.id);
    }
  }

  /* handel remove address */
  // function handelAddressRemove(e, address) {
  //   console.log(address, "address");
  // }

  // useEffect(() => {
  //   if (!user) {
  //     router.push("/loginPage");
  //   }
  //   if (user) {
  //     dispatch(getUserAllCard());
  //   }
  // }, [dispatch, handelRemover, handelUpdate, router]);



  useEffect(() => {
    !items.length && router.push("/");
  }, [handelRemover]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 ">
            <form className="bg-white mt-12 px-5 py-10" onSubmit={onSubmit}>
              <div className="space-y-12">
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
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
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Addresses
                    </button>
                  </div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Address
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose from existing address
                        </p>
                        <div className="mt-6 space-y-6">
                          <ul role="list" className="divide-y divide-gray-100">
                            {user?.addresses?.map((address, i) => (
                              <li
                                key={i}
                                className="flex justify-between gap-x-6 py-5"
                              >
                                <div className="flex min-w-0 gap-x-4">
                                  <input
                                    id="Address"
                                    name="Address"
                                    type="radio"
                                    onClick={(e) => setAddress(address)}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                  />
                                  <div className="min-w-0 flex-auto">
                                    <p className=" text-sm font-semibold leading-6 text-gray-900">
                                      {address.email}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                      {address.streetAddress}
                                    </p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                      {address.pinCode}
                                    </p>
                                  </div>
                                </div>
                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                  <div>
                                    <p className="text-sm leading-6 text-gray-900">
                                      {address.phone}
                                    </p>
                                    <p className="text-sm leading-6 space-x-5 text-gray-500">
                                      <span>{address.region}</span>
                                      <span>{address.city}</span>
                                      <span>{address.postalCode}</span>
                                    </p>
                                  </div>
                                  <span
                                    className="text-red-300 cursor-pointer text-sm capitalize hover:text-red-500"
                                    onClick={(e) =>
                                      handelAddressRemove(e, address)
                                    }
                                  >
                                    remove
                                  </span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Methods
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose a payment Method
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="Payment-cash"
                              name="paymentMethod"
                              type="radio"
                              checked={payment === "cash"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              onClick={(e) => setPayment("cash")}
                            />
                            <label
                              htmlFor="cashPayment"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="Card"
                              name="paymentMethod"
                              type="radio"
                              checked={payment === "card"}
                              onClick={(e) => setPayment("card")}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="push-email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto max-w-7xl  px-4 sm:px-6 sm:py-20  lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 p-4">
                      Card
                    </h1>
                    {items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>
                                  {product.product.title}
                                </a>
                              </h3>
                              <p className="ml-4">
                                ${product.product.price * product.quantity}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <h1>{}</h1>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quentity"
                                className="inline-block mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty :{product?.quantity}
                              </label>
                              <select
                                value={product?.quantity}
                                name=""
                                onChange={(e) => handelUpdate(e, product)}
                                id=""
                              >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={(e) => handelRemover(e, product)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p className="capitalize">Total Item</p>
                  <p>{totalItem}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p className="capitalize">Total Price</p>
                  <p>${totalPrice}</p>
                </div>
                {/* <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p> */}
                <div className="mt-6">
                  <div
                    onClick={handelOrder}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    order
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <Link href="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheackOutPage;
