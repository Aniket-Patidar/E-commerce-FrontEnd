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
  return (
    <div>
      {user ? (
        { children }
      ) : (
        <div className="w-[100vw] h-[100vh] flex items-center justify-center">
          <GridLoader color="#36d7b7"></GridLoader>
        </div>
      )}
    </div>
  );
};
export default Protected;
