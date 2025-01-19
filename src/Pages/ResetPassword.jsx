import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(null);
  const { id, token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setLocalError("Password does not match");
    }
    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, confirmPassword }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/signin");
      } else {
        setLocalError("Unable to reset password");
      }
    } catch (error) {
      setLocalError(error.message);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center min-h-80 min-w-96 mt-10 gap-3 border-2 border-gray-300 rounded-lg shadow-lg m-5 p-5">
        <h1 className="text-3xl font-serif font-semibold text-emerald-800">
          Reset Password
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <Label value="New Password" />
            <TextInput type='password' onChange={(e) => setNewPassword(e.target.value)} />
            <Label value="Confirm Password" />
            <TextInput type='password' onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disable={!newPassword || !confirmPassword}
              className="bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300"
            >
              Set Password
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

export default ResetPassword;
