import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const PaymenSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-blue-100 bg-opacity-70 backdrop-blur-md"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FaCircleCheck className="text-green-500 mx-auto mb-4" size={50} />
          <h2 className="text-2xl text-green-600 font-bold mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your transaction was completed
            successfully.
          </p>
          <button
            onClick={() => navigate("/dashboard?tab=profile")}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymenSuccess;
