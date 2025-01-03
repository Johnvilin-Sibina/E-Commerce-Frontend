import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownItem,
  Navbar,
  TextInput,
} from "flowbite-react";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/Slice/themeSlice";
import { signOutSuccess } from "../Redux/Slice/userSlice";

const Navigationbar = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  return (
    <Navbar
      className={
        theme === "light"
          ? " bg-gradient-to-r from-green-500 via-green-300 to-green-500"
          : "dark:bg-black dark:border-b-2 dark:border-white"
      }
    >
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span
          className={
            theme === "light"
              ? "px-2 py-2 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-lg"
              : "bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 rounded-lg px-2 py-1"
          }
        >
          LootMart
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search poducts..."
          rightIcon={FaSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button
        className={
          theme === "light"
            ? "bg-gradient-to-r from-emerald-300 to-emerald-500 lg:hidden"
            : "bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 lg:hidden"
        }
        outline
        pill
      >
        <FaSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button
          className={
            theme === "light"
              ? "bg-gradient-to-r from-emerald-300 to-emerald-500 hidden sm:inline"
              : "bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500"
          }
          outline
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                img={currentUser.rest.profilePicture}
                alt="User"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.rest.username}</span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <DropdownDivider />
            <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
          </Dropdown>
        ) : (
          <Link to="/signin">
            <Button
              className={
                theme === "light"
                  ? "bg-gradient-to-r from-emerald-300 to-emerald-500"
                  : "bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500"
              }
              outline
            >
              SignIn
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
