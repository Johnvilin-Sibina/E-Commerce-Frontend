import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 bg-orange-200 bg-opacity-70 backdrop-blur-md"></div>
      <div className="relative flex items-center justify-center h-full">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <FaTimesCircle className="text-red-600 mx-auto mb-4" size={50} />

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-4">
            Unfortunately, your transaction could not be completed. Please try
            again.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
