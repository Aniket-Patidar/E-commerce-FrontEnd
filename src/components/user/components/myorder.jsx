import Navbar from "@/components/Navbar/Navbar";
import SetColor from "@/components/comman/setColor";
import { AycGetAllOrder } from "@/components/order/apiCall";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MyOrder = () => {
  const { currentOrder, orders } = useSelector((state) => state.Order);
  const { user } = useSelector((state) => state.User);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AycGetAllOrder(user?.id));
  }, []);



  return (
    <>
      <Link href="/" className="px-2 py-2 font-semibold">Home</Link>
      <ul className="space-y-1 px-[100px] py-[10px]">
        {orders.map((order) => {
          return (
            <>
              <div className="mb-5 border-b-2 ">
                <div className="flex items-center justify-between pt-5">
                  <h1 className="text-lg font-bold mt-2">oder # {order.id} </h1>
                  <SetColor status={order.status}></SetColor>
                </div>
                {order.items.map((items) => {
                  console.log();
                  return (
                    <>
                      <li class="flex py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={items.product.thumbnail}
                            alt={items.product.title}
                            class="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <p>{items.product.title}</p>
                              </h3>
                              <p class="ml-4">
                                ${items.product.price * items.quantity}
                              </p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">
                              {items.product.description}
                            </p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm">
                            <p class="text-gray-500">Qty {items.quantity}</p>

                            <div class="flex"></div>
                          </div>
                        </div>
                      </li>
                    </>
                  );
                })}
                <div className="border-t border-gray-200 space-y-2">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="capitalize">Total Item</p>
                    <p> {order.totalItems}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p className="capitalize">Total Price</p>
                    <p>${order.totalAmount}</p>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default MyOrder;
