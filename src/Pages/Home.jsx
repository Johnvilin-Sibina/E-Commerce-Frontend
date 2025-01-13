import React, { useEffect } from 'react';
import CardComponent from '../Components/CardComponent';

const Home = () => {
    // const fetchProducts = async()=>{
    //     try{
    //         const res = await fetch('http://localhost:5000/api/user/get-products')
    //         res.json()
    //         console.log(res)
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
    // useEffect(()=>{
    //     fetchProducts()
    // },[])
    return (
        <div>
            <CardComponent />
        </div>
    );
};

export default Home;