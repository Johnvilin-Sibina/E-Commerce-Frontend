import React, { useEffect, useState } from "react";
import { Card, Carousel } from "flowbite-react";

const CardComponent = () => {

    const [products,setProducts] = useState([])

    useEffect(()=>{
        fetchProducts()
    },[])

    const fetchProducts = async()=>{
        const res = await fetch('http://localhost:5000/api/user/get-products',
           {
            method:'GET',
           }
        )
        const data = await res.json()
        setProducts(data.products)
    }

  return (
    
     <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1'>
        {products.map((product)=>{
           return  <Card className="max-w-md m-4 flex flex-col justify-between" key={product._id} >
             <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
             <Carousel pauseOnHover>
               {product.images.map((image,index)=>{
                return <img
                key={index}
                src={image}
                alt="Product image"
                className="w-full h-full object-cover"
              />
               })}
             </Carousel>
             </div>
             <div className="p-4 flex flex-col flex-grow">
             <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
               {product.productName}
             </h5>
             <p className="font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
               {product.description}
             </p>
             <h6>Rs:{product.price}</h6>
             </div>
           </Card>
        })}
     </div>
  );
};

export default CardComponent;