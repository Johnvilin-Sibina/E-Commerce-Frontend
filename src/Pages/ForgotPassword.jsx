import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [localError, setLocalError] = useState(null);
  const { theme } = useSelector((state) => state.theme);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://e-commerce-backend-5ceo.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/");
      } else {
        setLocalError("Unable to Send Mail");
      }
    } catch (error) {
      setLocalError(error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center min-h-80 min-w-96 mt-10 gap-3 border-2 border-gray-300 rounded-lg shadow-lg m-5 p-5">
        <h1
          className={
            theme === "light"
              ? "text-3xl font-serif font-semibold text-emerald-800"
              : "text-3xl font-serif font-semibold text-white"
          }
        >
          Forgot Password
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <Label value="Email" className="text-lg" />
            <TextInput
              type="text"
              id="email"
              placeholder="Enter Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className={
                theme === "light"
                  ? "bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300"
                  : "bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500"
              }
            >
              Send Mail
            </Button>
          </div>
        </form>
        {localError && (
          <Alert
            className="mt-3"
            color="failure"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">OOPS!</span>
            {localError}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
