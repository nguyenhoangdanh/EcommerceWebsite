import React, { useEffect } from "react";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
//   const{isAuthenticated} = useSelector((state) => state.user);
//   useEffect(() => {
//     if (isAuthenticated === true ) {
//       navigate("/")
//     }
//   },[])
  return (
    <div className="">
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
