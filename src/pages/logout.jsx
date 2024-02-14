import { logoutAyc } from "@/components/auth/apiCall";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";

const Logout = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.User);
  useEffect(() => {
    if (user) {
      dispatch(logoutAyc());
    }
    !user && router.push("/loginPage");
  }, [user]);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/loginPage");
    }
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center w-[100vw] h-[100vh]">
      <GridLoader></GridLoader>
    </div>
  );
};

export default Logout;
