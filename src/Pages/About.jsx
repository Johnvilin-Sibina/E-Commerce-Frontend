import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const About = () => {
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  return (
    <div
      className={
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-black text-gray-200"
      }
    >
      <div
        className={
          theme === "light"
            ? "bg-green-200 text-gray-900 py-12 text-center"
            : "bg-black border-y-2 border-white text-white py-12 text-center"
        }
      >
        <h1 className="text-4xl font-bold">About LootMart</h1>
        <p className="mt-4 text-lg">
          Your go-to e-commerce store for all your needs
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-indigo-600">
              Our Mission
            </h2>
            <p className="text-lg">
              At LootMart, our mission is to provide a seamless and
              customer-centric shopping experience for all types of products,
              from electronics to clothing and more. We aim to deliver
              exceptional value, outstanding service, and convenience to our
              customers.
            </p>

            <h2 className="text-3xl font-semibold text-indigo-600">
              Our Values
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-lg">
                Customer Satisfaction is our priority.
              </li>
              <li className="text-lg">Innovation in e-commerce solutions.</li>
              <li className="text-lg">
                Commitment to sustainability and ethical practices.
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center">
            <img
              className="rounded-lg w-full max-w-sm"
              src="./e-com.png"
              alt="LootMart"
            />
          </div>
        </div>
      </div>
      <div
        className={
          theme === "light"
            ? "bg-green-100 py-12"
            : "bg-black border-y-2 border-white py-12"
        }
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className={
              theme === "light"
                ? "text-3xl font-semibold text-green-600 text-center"
                : "text-3xl font-semibold text-white text-center"
            }
          >
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <p className="mt-4 text-xl font-semibold">Jane Doe</p>
              <p className="text-lg text-gray-600">CEO & Founder</p>
            </div>
            <div className="text-center">
              <p className="mt-4 text-xl font-semibold">John Smith</p>
              <p className="text-lg text-gray-600">COO</p>
            </div>
            <div className="text-center">
              <p className="mt-4 text-xl font-semibold">Sara Lee</p>
              <p className="text-lg text-gray-600">CTO</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className={
          theme === "light"
            ? "bg-green-200 text-gray-900 p-8"
            : "bg-black text-white p-8"
        }
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Join Our Community
        </h2>
        <p className="leading-relaxed mb-6">
          Become a part of the LootMart family and stay updated with the latest
          additions to our collection. We promise to keep you inspired and
          intrigued.
        </p>
        <button
          className="bg-white text-indigo-600 px-6 py-2 rounded-full font-semibold"
          onClick={() => navigate("/signup")}
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default About;
