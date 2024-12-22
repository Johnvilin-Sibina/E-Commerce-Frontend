import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <div className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-2 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-lg">
              LootMart
            </span>
          </div>
          <p className="text-sm mt-6">Sign up and create an account to place your orders. Use your email and password or Google to Sign up. **This is a demo project.""</p>
        </div>
        <div className="flex-1">
            <form className="flex flex-col gap-4">
                <div>
                    <Label value='User Name' />
                    <TextInput type='text' placeholder="Enter your user name" id='username' />
                </div>
                <div>
                    <Label value='Email' />
                    <TextInput type='email' placeholder="Enter your email" id='email' />
                </div>
                <div>
                    <Label value='Password' />
                    <TextInput type='password' placeholder="Enter your password" id='password' />
                </div>
                <Button className="bg-gradient-to-r from-emerald-300 to-emerald-500" type="submit">Sign Up</Button>
            </form>
            <div className="flex gap-2 text-sm mt-6">
                <span>Already have an account?</span>
                <Link to="/signin" className="text-blue-700 font-semibold">Sign In</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
