import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/forgot-password`,
        {
          email,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        // window.location.reload();
        navigate("/login");
        // setTimeout(function(){window.location.reload(true);},100)
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address...
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none  block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Already have an account?</h4>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;