import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryFailure,
  createCategoryStart,
  createCategorySuccess,
} from "../Redux/Slice/userSlice";
import { HiInformationCircle } from "react-icons/hi";

const CreateCategory = () => {
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [localError,setLocalError] = useState(null)
  const [successMessage,setSuccessMessage] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.categoryName || !formData.description) {
      return setLocalError("Please fill out all the fields");
    }
    try {
      dispatch(createCategoryStart());
      const res = await fetch(
        "http://localhost:5000/api/admin/create-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("Token"),
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (res.ok) {
        dispatch(createCategorySuccess(data));
        setSuccessMessage(data.message)
        console.log(data);
      }
      if (!res.ok) {
        dispatch(createCategoryFailure(data.message));
        console.log(data.message);
      }
    } catch (error) {
      dispatch(createCategoryFailure(error.message));
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen w-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col gap-5">
        <div className="flex-1 text-center">
          <h1 className="mt-4 mb-4 text-emerald-700 font-serif font-bold text-3xl">
            Create Category
          </h1>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Category" />
              <TextInput
                type="text"
                placeholder="Enter the category name"
                id="categoryName"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Description" />
              <TextInput
                type="text"
                placeholder="Enter the category description"
                id="description"
                onChange={handleChange}
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
          {(error || localError) && (
            <Alert
              className="mt-3"
              color="failure"
              icon={HiInformationCircle}
              withBorderAccent
            >
              <span className="font-medium me-2">OOPS!</span>
              {error || localError}
            </Alert>
          )}
          {successMessage && (
            <Alert
            className="mt-3"
            color="success"
            icon={HiInformationCircle}
            withBorderAccent
          >
            <span className="font-medium me-2">Hurray!</span>
            {successMessage}
          </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
