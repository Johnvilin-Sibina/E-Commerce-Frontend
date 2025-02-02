import { Alert, Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  fetchCartFailure,
  fetchCartStart,
  fetchCartSuccess,
} from "../Redux/Slice/userSlice";

const Cart = () => {
  const [localError, setLocalError] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const { currentUser, cart, error } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const fetchCartDetails = async () => {
    dispatch(fetchCartStart());
    try {
      const response = await fetch(
        `https://e-commerce-backend-5ceo.onrender.com/api/user/cart-details/${currentUser.rest._id}`,
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );

      if (!response.ok) {
        dispatch(fetchCartFailure("Failed to fetch cart details"));
        return;
      }

      const data = await response.json();
      dispatch(fetchCartSuccess(data.cartItems));
      setSubtotal(data.subtotal);
    } catch (error) {
      dispatch(fetchCartFailure(error.message));
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await fetch(
        `https://e-commerce-backend-5ceo.onrender.com/api/user/update-cart-quantity/${currentUser.rest._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );

      if (!response.ok) {
        setLocalError("Failed to update quantity");
        return;
      }

      await fetchCartDetails();
    } catch (error) {
      setLocalError(error.message);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        `https://e-commerce-backend-5ceo.onrender.com/api/user/remove-from-cart/${currentUser.rest._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        setLocalError("Failed to remove item from cart");
        return;
      }

      await fetchCartDetails();
    } catch (error) {
      setLocalError(error.message);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const makePayment = async () => {
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
          body: JSON.stringify({ products: cart, user: currentUser.rest }),
        }
      );
      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      setLocalError(error);
    }
  };

  return (
    <div className="min-h-screen w-screen p-8">
      <div
        className={
          theme === "light"
            ? "max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6"
            : "bg-black border-white border-2 rounded-lg max-w-4xl mx-auto shadow-md p-6"
        }
      >
        <h1
          className={
            theme === "ligth"
              ? "text-3xl  text-emerald-700 font-serif font-semibold mb-4 text-center"
              : "text-3xl text-white font-serif font-semibold mb-4 text-center"
          }
        >
          My Cart
        </h1>
        {cart.length === 0 ? (
          <p className={theme === "light" ? "text-gray-600" : "text-white"}>
            Your cart is empty.
          </p>
        ) : (
          <>
            <div
              className={
                theme === "light"
                  ? "border-b border-gray-200 pb-4 mb-4"
                  : "border-b border-white pb-4 mb-4"
              }
            >
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 gap-4"
                >
                  <img
                    src={item.picture[0]}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p
                      className={
                        theme === "light"
                          ? "text-lg font-medium text-gray-800"
                          : "text-lg font-medium text-white"
                      }
                    >
                      {item.name}
                    </p>
                    <p
                      className={
                        theme === "light"
                          ? "text-sm text-gray-600"
                          : "text-sm text-white"
                      }
                    >
                      {item.description}
                    </p>
                    <p
                      className={
                        theme === "light" ? "text-gray-500" : "text-white"
                      }
                    >
                      <b> ${item.price.toFixed(2)}</b>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className={
                          theme === "light"
                            ? "px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            : "px-2 py-1 bg-gray-700 rounded hover:bg-gray-900"
                        }
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className={
                          theme === "light"
                            ? "px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            : "px-2 py-1 bg-gray-700 rounded hover:bg-gray-900"
                        }
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p
                      className={
                        theme === "light"
                          ? "text-lg font-medium text-gray-800"
                          : "text-lg font-medium text-white"
                      }
                    >
                      <b>SubTotal: </b>Rs: {item.totalPrice.toFixed(2)}
                    </p>
                    <button
                      className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div
              className={
                theme === "light"
                  ? "flex justify-between items-center mt-4 border-b border-gray-200 pb-4 mb-4"
                  : "flex justify-between items-center mt-4 border-b border-white pb-4 mb-4"
              }
            >
              <h2
                className={
                  theme === "light"
                    ? "text-xl font-semibold text-gray-800"
                    : "text-xl font-semibold text-white"
                }
              >
                Total
              </h2>
              <p
                className={
                  theme === "light"
                    ? "text-xl font-semibold text-gray-800"
                    : "text-xl font-semibold text-white"
                }
              >
                Rs: {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-end mt-5">
              <Button type="button" color="blue" onClick={makePayment}>
                Pay
              </Button>
            </div>
          </>
        )}
      </div>
      <div className="m-4">
        {(error || localError) && (
          <Alert color="failure">
            <span className="font-medium">Error:</span> {error || localError}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Cart;
