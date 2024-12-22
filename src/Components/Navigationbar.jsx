// import { Avatar, Dropdown, Navbar } from "flowbite-react";
// import React from "react";
// import { IoSunnyOutline } from "react-icons/io5";
// import { FaMoon } from "react-icons/fa";

// const Navigationbar = () => {
//   return (
//     <Navbar className="border-2 bg-slate-50">
//       <Navbar.Brand>
//         <img src="./e-com.png" className="h-8" />
//         <span className="font-semibold font-serif text-xl text-slate-600">
//           LootMart
//         </span>
//       </Navbar.Brand>
//       <form className="flex items-center max-w-sm mx-auto">
//         <label htmlFor="simple-search" className="sr-only">
//           Search
//         </label>
//         <div className="relative w-full">
//           <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
//             <svg
//               className="w-4 h-4 text-gray-500 dark:text-gray-400"
//               aria-hidden="true"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 18 20"
//             >
//               <path
//                 stroke="currentColor"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
//               />
//             </svg>
//           </div>
//           <input
//             type="text"
//             id="simple-search"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Search branch name..."
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           <svg
//             className="w-4 h-4"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 20"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//             />
//           </svg>
//           <span className="sr-only">Search</span>
//         </button>
//       </form>

//       <Navbar.Toggle />
//       <Navbar.Collapse className="flex justify-center align-baseline">
//         <Navbar.Link className="text-slate-600 text-lg">SignIn</Navbar.Link>
//         <Dropdown
//           arrowIcon={false}
//           inline
//           label={<Avatar alt="User Settings" img="./avatar.jpg" rounded />}
//         >
//           <Dropdown.Header>Name</Dropdown.Header>
//           <Dropdown.Item>Profile</Dropdown.Item>
//           <Dropdown.Item>Orders</Dropdown.Item>
//           <Dropdown.Divider />
//           <Dropdown.Item>Sign Out</Dropdown.Item>
//         </Dropdown>
//         <Dropdown inline label={<span>All</span>}>
//           <Dropdown.Header>Categories</Dropdown.Header>
//           <Dropdown.Item>All</Dropdown.Item>
//           <Dropdown.Item>Beauty</Dropdown.Item>
//           <Dropdown.Item>Kitchen</Dropdown.Item>
//           <Dropdown.Item>Fashion</Dropdown.Item>
//           <Dropdown.Item>Groceries</Dropdown.Item>
//           <Dropdown.Item>Home Appliances</Dropdown.Item>
//         </Dropdown>
//         <Navbar.Link>
//           <IoSunnyOutline size={25} />
//         </Navbar.Link>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default Navigationbar;

// import { Avatar, Dropdown, Navbar } from "flowbite-react";
// import React from "react";
// import { IoSunnyOutline } from "react-icons/io5";

// const Navigationbar = () => {
//   return (
//     <Navbar className="border-2 bg-slate-50">
//       <Navbar.Brand href="/">
//         <img src="./e-com.png" className="h-8" alt="LootMart logo" />
//         <span className="ml-2 font-semibold font-serif text-xl text-slate-600">
//           LootMart
//         </span>
//       </Navbar.Brand>

//       {/* Search Bar */}
//       <form className="flex items-center w-full max-w-sm mx-auto">
//         <label htmlFor="simple-search" className="sr-only">
//           Search
//         </label>
//         <div className="relative w-full">
//           <input
//             type="text"
//             id="simple-search"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             placeholder="Search product..."
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           <svg
//             className="w-4 h-4"
//             aria-hidden="true"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 20 20"
//           >
//             <path
//               stroke="currentColor"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
//             />
//           </svg>
//           <span className="sr-only">Search</span>
//         </button>
//       </form>

//       <Navbar.Toggle />
//       <Navbar.Collapse>
//         <Navbar.Link className="text-slate-600 text-lg">SignIn</Navbar.Link>
//         {/* Theme Toggle Icon */}
//         <Navbar.Link>
//           <IoSunnyOutline size={25}/>
//         </Navbar.Link>
//       </Navbar.Collapse>
//        {/* Category Dropdown */}
//        <Dropdown inline label={<span>All</span>} className="flex md:order-2">
//           <Dropdown.Header>Categories</Dropdown.Header>
//           <Dropdown.Item>All</Dropdown.Item>
//           <Dropdown.Item>Beauty</Dropdown.Item>
//           <Dropdown.Item>Kitchen</Dropdown.Item>
//           <Dropdown.Item>Fashion</Dropdown.Item>
//           <Dropdown.Item>Groceries</Dropdown.Item>
//           <Dropdown.Item>Home Appliances</Dropdown.Item>
//         </Dropdown>
//         {/* User Avatar Dropdown */}
//       <Dropdown
//           arrowIcon={false}
//           inline
//           label={<Avatar alt="User Settings" img="./avatar.jpg" rounded/>}
//           className="flex md:order-1"
//         >
//           <Dropdown.Header>Name</Dropdown.Header>
//           <Dropdown.Item>Profile</Dropdown.Item>
//           <Dropdown.Item>Orders</Dropdown.Item>
//           <Dropdown.Divider />
//           <Dropdown.Item>Sign Out</Dropdown.Item>
//         </Dropdown>
//     </Navbar>
//   );
// };

// export default Navigationbar;

import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMoon, FaSearch } from "react-icons/fa";

const Navigationbar = () => {
  const path = useLocation().pathname
  return (
    <Navbar className="border-b-2 bg-gradient-to-r from-green-500 via-green-300 to-green-500">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-2 bg-gradient-to-r from-green-300 via-green-400 to-green-500 rounded-lg">
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
        className="bg-gradient-to-r from-emerald-300 to-emerald-500 lg:hidden"
        outline
        pill
      >
        <FaSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
      <Button
        className="bg-gradient-to-r from-emerald-300 to-emerald-500 hidden sm:inline"
        outline
        pill
      >
        <FaMoon />
      </Button>
      <Link to="/signin">
      <Button className="bg-gradient-to-r from-emerald-300 to-emerald-500" outline>SignIn</Button>
      </Link>
      <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
       <Navbar.Link active={path==='/'} as={'div'}>
       <Link to='/'>Home</Link></Navbar.Link> 
        <Navbar.Link active={path==='/about'} as={'div'}><Link to="/about">About</Link></Navbar.Link> 
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigationbar;
