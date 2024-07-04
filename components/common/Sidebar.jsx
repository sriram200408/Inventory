"use client";
import React, { useContext } from "react";
import Link from "next/link";
import MainHeader from "../common/header/Header";
import { AiOutlineHome, AiOutlineClose } from "react-icons/ai";
import { GrProjects } from "react-icons/gr";
import { FaAngleRight, FaCheck, FaCheckDouble } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { SiHelpscout, SiSinglestore } from "react-icons/si";
import { MenuContext } from "../../components/common/MenuContext";

const Sidebar = ({ children }) => {
  const { open } = useContext(MenuContext);

  return (
    <div className="bg-white ">
      <MainHeader />
      <aside className="bg-slate-700 text-white z-30 dark:bg-slate-600 dark:text-white top-0 justify-start left-0 lg:fixed lg:block  rounded-lg inset-y-0 border border-gray-200 shadow-sm w-2/12">
        <ul>
          <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
            <AiOutlineHome className="mr-2" />
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li className="flex flex-col justify-start items-start rounded-xl p-2">
            <div className="w-full flex flex-row justify-start items-center">
              <FaCheck className="mr-2" />
              <h3 className="flex-1">Products</h3>
              <FaAngleRight />
            </div>
            <ul className="ml-8 mt-4">
              <li className="flex justify-start items-center gap-3 w-full  hover:bg-blue-100 hover:text-blue-800 hover:scale-110">
                <SiSinglestore />
                <Link href="/Products/productslist">Products List</Link>
              </li>
              <li className="flex justify-start items-center gap-3  hover:bg-blue-100 hover:text-blue-800 hover:scale-105">
                <SiSinglestore />
                <Link href="/Products/addproducts">Add products</Link>
              </li>
            </ul>
          </li>
          <li className="flex flex-col justify-start items-start rounded-xl p-2">
            <div className="w-full flex flex-row justify-start items-center">
              <FaCheck className="mr-2" />
              <h3 className="flex-1">Categories</h3>
              <FaAngleRight />
            </div>
            <ul className="ml-8 mt-4">
              <li className="flex justify-start items-center gap-3  hover:bg-blue-100 hover:text-blue-800 hover:scale-105">
                <SiSinglestore />
                <Link href="/Categories/categorylist">List Category</Link>
              </li>
              <li className="flex justify-start items-center gap-3  hover:bg-blue-100 hover:text-blue-800 hover:scale-105">
                <SiSinglestore />
                <Link href="/Categories/addcategory">Add Category</Link>
              </li>
            </ul>
          </li> <li className="flex flex-col justify-start items-start rounded-xl p-2">
            <div className="w-full flex flex-row justify-start items-center">
              <FaCheck className="mr-2" />
              <h3 className="flex-1">Sale</h3>
              <FaAngleRight />
            </div>
            <ul className="ml-8 mt-4">
              <li className="flex justify-start items-center gap-3  hover:bg-blue-100 hover:text-blue-800 hover:scale-105">
                <SiSinglestore />
                <Link href="/Sale/saleslist">List Sale</Link>
              </li>
              <li className="flex justify-start items-center gap-3  hover:bg-blue-100 hover:text-blue-800 hover:scale-105">
                <SiSinglestore />
                <Link href="/Sale/addsale">Add Sale</Link>
              </li>
            </ul>
          </li>
          <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
            <SiHelpscout className="mr-2" />
            <Link href="/about-us">About us</Link>
          </li>
          <li className="flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
            <FiPhoneCall className="mr-2" />
            <Link href="/contact-us">Contact us</Link>
          </li>
        </ul>
      </aside>
      <div className="absolute inset-y-0 right-0 w-5/6 top-24">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
