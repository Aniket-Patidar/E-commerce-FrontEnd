import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getUserAllCard, removeItem, updateItem } from "./ApiCall";
import { useRouter } from "next/router";
import SetColor from "../comman/setColor";
import IsLoggin from "../isLoggin";
import { GridLoader } from "react-spinners";

const Card = () => {
  const [open, setOpen] = useState(true);
  const { allCard: items, loadingCard } = useSelector((state) => state.Card);
  const { user } = useSelector((state) => state.User);

  const dispatch = useDispatch();
  const router = useRouter();

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
  function handelUpdate(type, item) {
    if (type == "add" && item.quantity < item.product.stock) {
      dispatch(updateItem({ quantity: item.quantity + 1 }, { id: item.id }));
    }
    if (type == "sub" && item.quantity > 1) {
      dispatch(updateItem({ quantity: item.quantity - 1 }, { id: item.id }));
    }
  }

  useEffect(() => {
    dispatch(getUserAllCard());
  }, [dispatch,updateItem]);

  return (
    <IsLoggin>
      {loadingCard ? (
        <div className="w-full h-[80vh] flex items-center justify-center">
          <GridLoader color="#5C5FDC"></GridLoader>
        </div>
      ) : (
        <>
          {items?.length ? (
            <div className="mx-auto max-w-7xl  px-4 sm:px-6 sm:py-20  lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    <h1 class="text-4xl font-bold tracking-tight text-gray-900 p-4">
                      Card
                    </h1>
                    {items.map((product) => {
                      return (
                        <>
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
                                    <span
                                      className={`ml-2 ${
                                        product.product.stock
                                          ? "bg-green-200 text-green-600 py-1"
                                          : "bg-red-200 text-red-600 py-1"
                                      }  px-3 rounded-full text-xs`}
                                    >
                                      stock : {product.product.stock}
                                    </span>
                                    <br />

                                    {/*     <p className="text-sm opacity-20">
                                Qty :{product?.quantity}
                              </p> */}
                                  </h3>
                                  <p className="ml-4">
                                    ${product.product.price * product.quantity}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {product.color}
                                </p>
                              </div>
                              {/* <h1>{product?.}</h1> */}
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quentity"
                                    className="inline-block mr-5 text-sm font-medium leading-6 text-gray-900"
                                  ></label>
                                  <button
                                    className="p-2 text-2xl"
                                    onClick={(e) =>
                                      handelUpdate("add", product)
                                    }
                                  >
                                    +
                                  </button>
                                  <span>{product.quantity}</span>
                                  <button
                                    className="px-2 text-2xl"
                                    onClick={(e) =>
                                      handelUpdate("sub", product)
                                    }
                                  >
                                    -
                                  </button>
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
                        </>
                      );
                    })}
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
                <div className="mt-6">
                  <Link
                    href="/cheackOutPage"
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
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
          ) : (
            <div className="flex flex-col items-center justify-center">
              <img className="w-[450px]" src="./empty.webp" alt="" />
              <Link href={"/"}>Continue Shopping</Link>
            </div>
          )}
        </>
      )}
    </IsLoggin>
  );
};

export default Card;
