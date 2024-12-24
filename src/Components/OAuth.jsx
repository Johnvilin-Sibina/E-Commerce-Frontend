import { Button } from 'flowbite-react';
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../Redux/Slice/userSlice';
import { app } from '../firebase';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const OAuth = () => {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async()=>{
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt:'select_account'})
        try {
            const result = await signInWithPopup(auth,provider)
            const res =await fetch('http://localhost:5000/api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    name:result.user.displayName,
                    email:result.user.email,
                    profilePic:result.user.photoURL
                })
            })
            const data = await res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
            console.log(data);
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <Button type='button' className='bg-gradient-to-r from-emerald-300 to-emerald-500' onClick={handleSubmit}>
            <FcGoogle className='mr-3 w-5 h-5' /><span>Continue with Google</span>
        </Button>
    );
};

export default OAuth;