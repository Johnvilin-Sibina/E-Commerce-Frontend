import { Alert, Button, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-circular-progressbar/dist/styles.css";
import {
  HiInformationCircle,
  HiOutlineExclamationCircle,
} from "react-icons/hi";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../Redux/Slice/userSlice";
import { useNavigate } from "react-router-dom";

const DashboardProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user,setUser] = useState(currentUser)

  //Function to handle profile picture update
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFileUploadError("Please select a valid image file.");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);
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
      const uploadResponse = await res.json();
      if (uploadResponse?.secure_url) {
        setImageFileUrl(uploadResponse.url);
        setFormData((prev) => ({
          ...prev,
          profilePicture: uploadResponse.secure_url,
        }));
      } else {
        setImageFileUploadError("Failed to upload image. Please try again");
      }
    } catch (error) {
      setImageFileUploadError(error);
    }
    setImageFileUploading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("Please wait while the image is uploading");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(
        `http://localhost:5000/api/user/update/${currentUser.rest._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess(data.message);
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  // useEffect(()=>{
  //  try {
  //   const fetchUpdatedUser = async()=>{
  //     const res = await fetch(`http://localhost:5000/api/user/get-user/${currentUser.rest._id}`,{
  //       method: 'GET',
  //       headers:{
  //         "Content-Type":'application/json',
  //         'token':localStorage.getItem('Token')
  //       }
  //     })
  //     const data = await res.json()
  //     console.log(data)
  //    }
  //    fetchUpdatedUser()
  //    if(res.ok)
  //     setUser(data)
  //  } catch (error) {
  //   console.log('An error occured:',error)
  //  }
  // },[currentUser])

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  const handleDelete = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const response = await fetch(
        `http://localhost:5000/api/user/delete/${currentUser.rest._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
        navigate('/signup')
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-serif font-semibold text-4xl text-emerald-900 dark:text-white">
        Profile
      </h1>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
          {imageFileUploading ? (
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
          defaultValue={currentUser.rest.username || user.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.rest.email || user.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="*****"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="address"
          placeholder="Address"
          defaultValue={currentUser.rest.address || user.address}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="phoneNumber"
          placeholder="Phone Number"
          defaultValue={currentUser.rest.phoneNumber || user.phoneNumber}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className={
            theme === "light"
              ? "bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300 mt-4"
              : "bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500 mt-4"
          }
          disabled={loading || imageFileUploading}
        >
          {loading ? "Loading .." : "Update"}
        </Button>
      </form>
      <div className="text-red-600 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModal(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
        {updateUserSuccess && (
          <Alert
            className="mt-3"
            color="success"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">Hurray!</span>
            {updateUserSuccess}
          </Alert>
        )}
        {updateUserError && (
          <Alert
            className="mt-3"
            color="failure"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">OOPS!</span>
            {updateUserError}
          </Alert>
        )}
        {error && (
          <Alert
            className="mt-3"
            color="failure"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">OOPS!</span>
            {error}
          </Alert>
        )}
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-500 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">
                Are you sure you want to delete this account?
              </h3>
              <div className="flex justify-between">
                <Button color="failure" onClick={handleDelete}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default DashboardProfile;
