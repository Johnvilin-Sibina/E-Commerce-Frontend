import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  const fetchCartDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/cart-details/${currentUser.rest._id}`,
        {
          method: "GET",
          headers: {
            token: localStorage.getItem("Token"),
          },
        }
      );

      if (!response.ok) {
        console.log("Failed to fetch cart details");
        return;
      }

      const data = await response.json();
      setCartItems(data.cartItems);
      setSubtotal(data.subtotal);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/user/update-cart-quantity/${currentUser.rest._id}`,
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
        console.log("Failed to update quantity");
        return;
      }

      await fetchCartDetails();
    } catch (error) {
      console.log(error.message);
    }
  };

  
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/remove-from-cart/${currentUser.rest._id}`,
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
        console.log("Failed to remove item from cart");
        return;
      }

      await fetchCartDetails();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, []);

  const makePayment = async()=>{
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
try {
  const response = await fetch('http://localhost:5000/api/user/create-checkout-session',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      token:localStorage.getItem('Token')
    },
    body:JSON.stringify({products:cartItems})
  })
  const session = await response.json()

  const result = stripe.redirectToCheckout({
    sessionId:session.id
  })
} catch (error) {
  console.log(error)
}
  }
  return (
    <div className="min-h-screen w-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl  text-emerald-700 font-serif font-semibold mb-4 text-center">My Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="border-b border-gray-200 pb-4 mb-4">
              {cartItems.map((item) => (
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
                    <p className="text-lg font-medium text-gray-800">
                      {item.name}
                    </p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-gray-500">
                     <b> ${item.price.toFixed(2)}</b>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-800">
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
            <div className="flex justify-between items-center mt-4 border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Total</h2>
              <p className="text-xl font-semibold text-gray-800">
                Rs: {subtotal.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-end mt-5">
              <Button type='button' color='blue' onClick={makePayment}>Pay</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
