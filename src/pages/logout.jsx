import { logoutAyc } from "@/components/auth/apiCall";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  return <div>Logout</div>;
};

export default Logout;
