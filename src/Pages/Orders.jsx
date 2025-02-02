import { Alert, Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  fetchOrdersFailure,
  fetchOrdersStart,
  fetchOrdersSuccess,
} from "../Redux/Slice/userSlice";
import { HiInformationCircle } from "react-icons/hi";

const Orders = () => {
  const { currentUser, error, loading, orders } = useSelector(
    (state) => state.user
  );
  const { theme } = useSelector((state) => state.theme);
  const [localError, setLocalError] = useState(null);
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    try {
      dispatch(fetchOrdersStart());
      const response = await fetch(
        `https://e-commerce-backend-5ceo.onrender.com/api/user/get-orders/${currentUser.rest._id}`,
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );

      if (!response.ok) {
        return dispatch(fetchOrdersFailure("Failed to fetch orders"));
      }

      const data = await response.json();
      console.log(data.orderDetails);
      dispatch(fetchOrdersSuccess(data.orderDetails));
    } catch (error) {
      dispatch(fetchOrdersFailure(error.message));
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const makePayment = async (productItem) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
    try {
      const response = await fetch(
        "https://e-commerce-backend-5ceo.onrender.com/api/user/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify({
            products: [{ ...productItem, id: productItem.productId._id }],
            user: currentUser.rest,
          }),
        }
      );
      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      setLocalError(error.message);
    }
  };

  return (
    <div
      className={
        theme === "light"
          ? "min-h-screen w-full p-8 bg-gray-50"
          : "min-h-screen w-full p-8 bg-black"
      }
    >
      <div
        className={
          theme === "light"
            ? "max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
            : "max-w-4xl mx-auto bg-black rounded-lg p-6"
        }
      >
        <h1
          className={
            theme === "light"
              ? "text-3xl text-emerald-700 font-serif font-semibold mb-4 text-center"
              : "text-3xl text-white font-serif font-semibold mb-4 text-center"
          }
        >
          Your Orders
        </h1>

        {(error || localError) && (
          <Alert
            className="m-3"
            color="failure"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">OOPS!</span>
            {error || localError}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner aria-label="Loading..." />
          </div>
        ) : orders && orders.length === 0 ? (
          <p
            className={
              theme === "light"
                ? "text-center text-gray-600"
                : "text-center text-white"
            }
          >
            No orders found.
          </p>
        ) : (
          <div>
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-200 rounded-lg p-4 mb-4"
              >
                {/* Loop through products inside the order */}
                {order.products.map((productItem) => (
                  <div
                    key={productItem.productId._id}
                    className="flex items-center border-b border-gray-200 pb-4 mb-4"
                  >
                    <img
                      src={productItem.productId.images[0]}
                      alt={productItem.productId.productName}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-4">
                      <p
                        className={
                          theme === "light"
                            ? "text-lg font-medium text-gray-800"
                            : "text-lg font-medium text-white"
                        }
                      >
                        {productItem.productId.productName}
                      </p>
                      <p
                        className={
                          theme === "light"
                            ? "text-sm text-gray-600"
                            : "text-sm text-gray-200"
                        }
                      >
                        {productItem.productId.description}
                      </p>
                      <p
                        className={
                          theme === "light"
                            ? "text-gray-500 mt-1"
                            : "text-white mt-1"
                        }
                      >
                        <b>Price:</b> ${productItem.price}
                      </p>
                      <p
                        className={
                          theme === "light"
                            ? "text-gray-500 mt-1"
                            : "text-white mt-1"
                        }
                      >
                        <b>Quantity:</b> {productItem.quantity}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        color="blue"
                        className={
                          theme === "light"
                            ? "hover:bg-blue-500 text-white mx-2 px-3 py-1 rounded text-xs"
                            : "dark:bg-slate-800 dark:hover:bg-gray-900 to-slate-500 mx-2 px-3 py-1 rounded text-xs"
                        }
                        size="xs"
                        onClick={() => makePayment(productItem)}
                      >
                        Buy Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
