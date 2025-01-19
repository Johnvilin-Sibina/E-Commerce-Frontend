import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../Redux/Slice/userSlice";
import OAuth from "../Components/OAuth";

const Signin = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  //Function to handle the value change in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  //Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the fields"));
    }
    try {
      dispatch(signInStart());
      const response = await fetch(
        "http://localhost:5000/api/auth/login-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (response.ok) {
        localStorage.setItem('Token',data.token)
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <div className="font-bold dark:text-white text-4xl">
            <span className={theme === 'light' ? "px-2 py-2 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-lg" : 'bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 rounded-lg px-2 py-1'}>
              LootMart
            </span>
          </div>
          <p className="text-sm mt-6">
            Sign in to place your orders. Use your email and password or Google.
            **This is a demo project.""
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="Enter your email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="Enter your password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              className={theme === 'light' ? "bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300" : 'bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500'}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner color="success" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-6">
            <span>Do not have an account?</span>
            <Link to="/signup" className="text-blue-700 font-semibold">
              Sign Up
            </Link>
          </div>
          <div>
          <Link to='/forgotpassword' className="text-blue-700 font-semibold">Forgot Password?</Link>
          </div>
          {errorMessage && (
            <Alert
              className="mt-3"
              color="failure"
              icon={HiInformationCircle}
              withBorderAccent
            >
              <span className="font-medium me-2">OOPS!</span>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signin;
