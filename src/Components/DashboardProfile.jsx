import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import { HiInformationCircle } from "react-icons/hi";

const DashboardProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();

  //Function to handle profile picture update
  const handleImageChange = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      setImageFileUploadError("An error occured during the upload.");
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "E-Commerce");
    data.append("cloud_name", "dhke5mt23");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhke5mt23/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const uploadImageUrl = await res.json();
      if (uploadImageUrl?.url) {
        setImageFileUrl(uploadImageUrl.url);
      }
      setLoading(false);
    } catch (error) {
      setImageFileUploadError(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-serif font-semibold text-4xl text-emerald-900 dark:text-white">
        Profile
      </h1>
      <form className="flex flex-col gap-5">
        <input
          type="file"
          accept="image/*"
          ref={filePickerRef}
          onChange={handleImageChange}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {loading ? (
            <div className="ms-6 mt-8">Loading...</div>
          ) : (
            <img
              src={
                imageFileUrl ? imageFileUrl : currentUser.rest.profilePicture
              }
              alt="User"
              className="rounded-full w-full h-full object-cover border-8 border-gray-300"
            />
          )}
        </div>
        {imageFileUploadError && (
          <Alert
            className="mt-3"
            color="failure"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">OOPS!</span>
            {imageFileUploadError}
          </Alert>
        )}
        {imageFileUrl && (
          <Alert
            className="mt-3"
            color="success"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">
              Hurray! Your profile picture is uploaded successfully.
            </span>
          </Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="User Name"
          defaultValue={currentUser.rest.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.rest.email}
        />
        <TextInput type="password" id="password" placeholder="*****" />
        <Button
          type="submit"
          className={
            theme === "light"
              ? "bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300 mt-4"
              : "bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 mt-4"
          }
        >
          Update
        </Button>
      </form>
      <div className="text-red-600 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashboardProfile;
