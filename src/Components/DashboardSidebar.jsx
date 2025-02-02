import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {  HiUser } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signOutSuccess } from "../Redux/Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaCartPlus, FaSignOutAlt } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";

const DashboardSidebar = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const {theme} = useSelector((state)=>state)
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  return (
    <Sidebar className="w-full md:w-58">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.rest.isAdmin ? "Admin" : "User"}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=createproducts">
            <Sidebar.Item
              active={tab === "createproducts"}
              icon={AiFillProduct}
              as="div"
              className={!currentUser.rest.isAdmin && "hidden"}
            >
              Add Products
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=createcategory">
            <Sidebar.Item
              active={tab === "createcategory"}
              icon={MdCategory}
              as="div"
              className={!currentUser.rest.isAdmin && "hidden"}
            >
              Add Category
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=mycart">
            <Sidebar.Item
              active={tab === "mycart"}
              icon={FaCartPlus}
              as="div"
              className={currentUser.rest.isAdmin && "hidden"}
            >
              My Cart
            </Sidebar.Item>
          </Link>
          <Link to="/dashboard?tab=myorders">
            <Sidebar.Item
              active={tab === "myorders"}
              icon={AiFillProduct}
              as="div"
              className={currentUser.rest.isAdmin && "hidden"}
            >
              My Orders
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={FaSignOutAlt}
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashboardSidebar;
