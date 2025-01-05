import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardProfile from "../Components/DashboardProfile";
import DashboardSidebar from "../Components/DashboardSidebar";
import CreateProducts from "../Components/CreateProducts";
import { useSelector } from "react-redux";
import CreateCategory from "../Components/CreateCategory";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrl = urlParams.get("tab");
    if (tabUrl) {
      setTab(tabUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-58">
        <DashboardSidebar />
      </div>
      {tab === "profile" && <DashboardProfile />}
      {tab === "createproducts" && currentUser.rest.isAdmin && (
        <CreateProducts />
      )}
       {tab === "createcategory" && currentUser.rest.isAdmin && (
        <CreateCategory />
      )}
    </div>
  );
};

export default Dashboard;
