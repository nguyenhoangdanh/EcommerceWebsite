import React, { useEffect } from "react";
import Login from "../components/login/Login.jsx";
import { useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"
const LoginPage = () => {
  const navigate = useNavigate();
  const{isAuthenticated} = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated === true ) {
      navigate("/")
    }
  },[])
  return (
    <div className="">
      <Login />
    </div>
  );
};

export default LoginPage;
