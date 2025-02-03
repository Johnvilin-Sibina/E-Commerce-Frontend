import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Alert, Spinner } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addToCartStart,
  addToCartSuccess,
  addToCartFailure,
} from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";


const CardComponent = () => {
  const [localError, setLocalError] = useState(null);
  const { products, error, loading, currentUser } = useSelector(
    (state) => state.user
  );
  const{theme} = useSelector((state)=>state.theme)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch(fetchProductsStart());
    try {
      const res = await fetch("https://e-commerce-backend-5ceo.onrender.com/api/user/get-products", {
        method: "GET",
      });
      const data = await res.json();
      dispatch(fetchProductsSuccess(data.products));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };

  const addToCart = async (productId) => {
    dispatch(addToCartStart())
    try {
      const res = await fetch("https://e-commerce-backend-5ceo.onrender.com/api/user/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify({ productId, userId: currentUser.rest._id }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(addToCartSuccess(productId))
        alert("Product added to cart successfully");
        navigate("/dashboard?tab=mycart");
      } 
    } catch (error) {
      dispatch(addToCartFailure(error.message))
    }
  };

  const makePayment = async (product) => {
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
            products: [{ ...product, quantity: 1, id: product._id }],
            user: currentUser.rest,
          }),
        }
      );
      const session = await response.json();
      console.log("Session ID:", session.id)
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      setLocalError("Error in make payment", error.message);
      console.error("Error in make payment:", error.message);
    }
  };

  return (
    <>
      <div className="m-4">
        {error && (
          <Alert color="failure">
            <span className="font-medium">Error:</span> {error}
          </Alert>
        )}
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner aria-label="Loading..." />
        </div>
      )}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
        {products.map((product) => {
          return (
            <Card
              className="max-w-md m-4 flex flex-col justify-between dark:bg-black dark:border-white" 
              key={product._id}
            >
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel pauseOnHover>
                  {product.images.map((image, index) => {
                    return (
                      <img
                        key={index}
                        src={image}
                        alt="Product image"
                        className="w-full h-full object-cover"
                      />
                    );
                  })}
                </Carousel>
              </div>
              <div className="p-4 flex flex-col flex-grow gap-2">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {product.productName}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-100">
                  {product.description}
                </p>
                <h6>${product.price}</h6>
              </div>
              <div className="flex justify-between gap-4">
                <Button
                  type="submit"
                  outline
                  gradientMonochrome="cyan"
                  size="lg"
                  onClick={() => makePayment(product)}
                >
                  Buy
                </Button>
                <Button outline gradientMonochrome="cyan" size="lg">
                  <FaCartPlus
                    size={25}
                    onClick={() => addToCart(product._id)}
                  />
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
      <div className="m-4">
        {localError && (
          <Alert color="failure">
            <span className="font-medium">Error:</span> {localError}
          </Alert>
        )}
      </div>
    </>
  );
};

export default CardComponent;
