// admin
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOrder, getAllOrder } from "../apiCall";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { CiFilter } from "react-icons/ci";
import { BsSortDownAlt } from "react-icons/bs";

import { ITEMS_PER_PAGE } from "../../../../utils/const";
import SetColor from "@/components/comman/setColor";
import { setUserInfo } from "@/components/auth/userSclice";
import { useRouter } from "next/router";
import IsLoggin from "@/components/isLoggin";

const OderList = () => {
  /* get all orders */
  const dispatch = useDispatch();
  const ITEMS_PER_PAGE_orders = 6;
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ _sort: "", _order: "" });
  const { OrderProduct, totalItems } = useSelector((state) => state.admin);
  const { user, ischeckUser } = useSelector((state) => state.User);
  const router = useRouter();
  const [edit, setEdit] = useState();

  function handelPage(page) {
    setPage(page);
  }
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE_orders };
    dispatch(getAllOrder({}, sort, pagination));
  }, [dispatch, page, sort, EditOrder]);

  useEffect(() => {
    setPage(1);
  }, [totalItems, sort]);

  function handelStatusUpdate(e, order) {
    dispatch(EditOrder(order.id, e.target.value));
    setEdit("");
  }

  return (
    <IsLoggin>
      <div className="overflow-x-auto">
        <div className="min-w-screen  bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="space-x-3 flex items-center cursor-pointer">
              <CiFilter></CiFilter>
              <select
                onClick={(e) => {
                  setSort({ ...sort, _sort: e.target.value });
                }}
                className="cursor-pointer"
              >
                <option value="id">order ID</option>
                <option value="totalItems">Total items</option>
                <option value="totalAmount">Total Amount</option>
                <option value="id">Status</option>
              </select>
              <BsSortDownAlt></BsSortDownAlt>
              <select
                className="cursor-pointer"
                onClick={(e) => {
                  setSort({ ...sort, _order: e.target.value });
                }}
              >
                <option value="asc">Assending</option>
                <option value="desc">Decending</option>
              </select>
            </div>

            <div className="bg-white shadow-md rounded my-6">
              <table className=" w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">order ID</th>
                    <th className="py-3 px-6 text-left">Total items</th>
                    <th className="py-3 px-6 text-left">Total Amount</th>
                    <th className="py-3 px-6 text-center">Shipping Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Edit</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {OrderProduct.map((order, index) => {
                    return (
                      <>
                        <tr className="border-b border-gray-200 hover:bg-gray-100">
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="font-medium">#{order.id}</span>
                            </div>
                          </td>
                          <td class="py-3 px-6 text-center">
                            <div class="flex items-center justify-center">
                              {order.totalItems}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex items-center justify-center">
                              ${order.totalAmount}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-center">
                            <div className=" items-center justify-center">
                              <div>Phone:{order?.Address?.phone},</div>
                              <div>
                                Postal-Code:{order?.Address?.postalCode},
                              </div>
                              <div>Region:{order?.Address?.region},</div>
                              <div>
                                Street-Address:{order?.Address?.streetAddress},
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-6 Ftext-center">
                            {edit == order.id ? (
                              <select
                                onChange={(e) => handelStatusUpdate(e, order)}
                              >
                                <option>dispatch</option>
                                <option>delivered</option>
                                <option>cancelled</option>
                                <option>pending</option>
                              </select>
                            ) : (
                              <SetColor status={order?.status} />
                            )}
                          </td>

                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  onClick={() => setEdit(order.id)}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <span
            onClick={() => handelPage(page > 1 ? page - 1 : page)}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </span>
          <span
            onClick={(e) =>
              handelPage(
                page < totalItems / ITEMS_PER_PAGE_orders ? page + 1 : page
              )
            }
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </span>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE_orders + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {page * ITEMS_PER_PAGE_orders > totalItems
                  ? totalItems
                  : page * ITEMS_PER_PAGE_orders}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={(e) => handelPage(page > 1 ? page - 1 : page)}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {Array.from({
                length: Math.ceil(totalItems / ITEMS_PER_PAGE_orders),
              }).map((el, index) => {
                return (
                  <>
                    {" "}
                    <div
                      onClick={(e) => handelPage(index + 1)}
                      aria-current="page"
                      className={`relative cursor-pointer z-10 text-white inline-flex items-center ${
                        page == index + 1
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-red"
                      } px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                    >
                      <p className="text-gray-400">{index + 1}</p>
                    </div>
                  </>
                );
              })}

              <div
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                onClick={(e) =>
                  handelPage(
                    page < totalItems / ITEMS_PER_PAGE_orders ? page + 1 : page
                  )
                }
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </IsLoggin>
  );
};

export default OderList;
