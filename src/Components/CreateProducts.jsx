import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryStart,
  createProductFailure,
  createProductStart,
  createProductSuccess,
} from "../Redux/Slice/userSlice";

const CreateProducts = () => {
  const { theme } = useSelector((state) => state.theme);
  const {error} = useSelector((state)=>state.user);
  const [localError,setLocalError] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [successMessage,setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  //Upload images to cloudinary
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) {
      return setImageFileUploadError(
        "Please choose at least one file to upload."
      );
    }

    setImageFileUploading(true);
    setImageFileUploadError(null);

    const uploadedUrls = [];

    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "E-Commerce");
        data.append("cloud_name", "dhke5mt23");

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dhke5mt23/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const uploadResponse = await res.json();

        if (uploadResponse?.secure_url) {
          uploadedUrls.push(uploadResponse.secure_url); // Add the uploaded URL to the list
        } else {
          setImageFileUploadError(
            "Failed to upload one or more images. Please try again."
          );
        }
      }

      if (uploadedUrls.length) {
        setImageFileUrl(uploadedUrls); // Store all uploaded URLs in state
        setFormData((prev) => ({
          ...prev,
          images: uploadedUrls, // Add images array to formData
        }));
      }
    } catch (error) {
      setImageFileUploadError("An error occurred while uploading images.");
      console.log(error);
    }

    setImageFileUploading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.productName ||
      !formData.description ||
      !formData.price ||
      !formData.stock ||
      !formData.category ||
      !formData.images
    ) {
    //   return dispatch(createProductFailure("Please fill out all the fields"));
    return setLocalError('Please fill out all the fields')
    }
    try {
      dispatch(createCategoryStart());
      const res = await fetch("http://localhost:5000/api/admin/create-product", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("Token"),
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(createProductSuccess(data));
        setSuccessMessage(data.message)
        console.log(data);
      }
      if (!res.ok) {
        dispatch(createProductFailure(data.message));
        console.log(data.message);
      }
    } catch (error) {
        dispatch(createProductFailure(error.message));
        console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen w-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col gap-5">
        <div className="flex-1 text-center">
          <h1 className="mt-4 mb-4 text-emerald-700 font-serif font-bold text-3xl">
            Add Products
          </h1>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Product Name" />
              <TextInput
                type="text"
                placeholder="Enter the product name"
                id="productName"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Description" />
              <TextInput
                type="text"
                placeholder="Enter the product description"
                id="description"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Category" />
              <TextInput
                type="text"
                placeholder="Enter the product category"
                id="category"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Price" />
              <TextInput
                type="text"
                placeholder="Enter the product price"
                id="price"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Stock" />
              <TextInput
                type="text"
                placeholder="Enter the stock"
                id="stock"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Upload Product Images" />
              <FileInput
                id="images"
                accept="image/*"
                multiple
                helperText="JPEG/JPG, PNG, SVG, GIF, BMP, WebP "
                onChange={handleImageUpload}
              />
            </div>
            <Button
              className={
                theme === "light"
                  ? "bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300"
                  : "bg-gradient-to-r from-slate-500 via-slate-400 to-slate-500"
              }
              type="submit"
            >
              Create
            </Button>
          </form>
          {(error || localError || imageFileUploadError) && (
                   <Alert
                     className="mt-3"
                     color="failure"
                     icon={HiInformationCircle}
                     withBorderAccent
                   >
                     <span className="font-medium me-2">OOPS!</span>
                     {error || localError || imageFileUploadError }
                   </Alert>
                 )}
                 { successMessage && (
                    <Alert
                    className='mt-3'
                    color="success"
                    icon={HiInformationCircle}
                    withBorderAccent>
                        <span className='font-medium me-2'>Hurray!</span>
                        {successMessage}
                    </Alert>
                 )}
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
