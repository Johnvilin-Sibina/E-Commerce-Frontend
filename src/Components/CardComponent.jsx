import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "flowbite-react";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCartFailure, addToCartStart, addToCartSuccess } from "../Redux/Slice/userSlice";


const CardComponent = () => {
  const [products, setProducts] = useState([]);
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/user/get-products", {
      method: "GET",
    });
    const data = await res.json();
    setProducts(data.products);
  };

  const addToCart = async (productId) => {
    try {
      dispatch(addToCartStart())
      const res = await fetch("http://localhost:5000/api/user/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify({ productId,userId:currentUser.rest._id }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(addToCartSuccess(data.cartItem))
        alert("Product added to cart successfully");
      } else {
        dispatch(addToCartFailure(data.message || "Failed to add product to cart"))
        alert(data.message || "Failed to add product to cart");
      }
    } catch (error) {
      dispatch(addToCartFailure("Error adding product to cart:", error))
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
      {products.map((product) => {
        return (
          <Card
            className="max-w-md m-4 flex flex-col justify-between"
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
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {product.description}
              </p>
              <h6>${product.price}</h6>
            </div>
            <div className="flex justify-between gap-4">
              <Button type="submit" outline gradientMonochrome="cyan" size="lg">
                Buy
              </Button>
              <Button outline gradientMonochrome="cyan" size="lg">
                <FaCartPlus size={25} onClick={() => addToCart(product._id)} />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default CardComponent;
