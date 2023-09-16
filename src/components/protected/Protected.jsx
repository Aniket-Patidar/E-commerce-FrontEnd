import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.User);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/loginPage");
    }
  }, []);
  return <div>{user ? { children } : "loading"}</div>;
};
export default Protected;
