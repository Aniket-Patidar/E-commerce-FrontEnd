import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "./auth/userSclice";
import { useRouter } from "next/router";
import { GridLoader } from "react-spinners";
import Navbar from "./Navbar/Navbar";
import { getUserInfo } from "./auth/apiCall";
const IsLoggin = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { user,  } = useSelector((state) => state.User);
  // const [check, setCheck] = useState(true);
  // useEffect(() => {
  //   dispatch(setUserInfo());
  //   if (!user && ischeckUser) {
  //     router.push("/loginPage");
  //   }
  //   if (user) {
  //     console.log(user, ischeckUser, "user");
  //     setCheck(true);
  //   }
  // }, []);

  // console.log();
  // console.log(user, ischeckUser, "user2");

  // useEffect(() => {
  //   dispatch(setUserInfo());
  // }, []);
  // console.log(user, "user");

  const { user, error, LoginUser, ischeckUser } = useSelector(
    (state) => state.User
  );

  useEffect(() => {
    dispatch(getUserInfo());
  }, [LoginUser, user, ischeckUser]);

  // useEffect(()=>{

  //   if(!user && ischeckUser){
  //     router.push('/loginPage')
  //   }
  // },[])

  return (
    <>
      {(user || LoginUser) && ischeckUser ? (
        <Navbar>{children}</Navbar>
      ) : (
        <>
          <div className="w-full  absolute top-[50%] left-[50%] -translate-x-50 -translate-y-50">
            <GridLoader color="#36d7b7" />
          </div>
        </>
      )}
    </>
  );
};

export default IsLoggin;
