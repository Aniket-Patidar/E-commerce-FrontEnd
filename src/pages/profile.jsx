import IsLoggin from "@/components/isLoggin";
import Profile from "@/components/user/components/userprofile";
import React from "react";

const profile = () => {
  return (
    <IsLoggin>
      <Profile></Profile>
    </IsLoggin>
  );
};

export default profile;
