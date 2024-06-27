"use client";
import React, { useContext } from "react";
import MainHeader from "./MainHeader";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MenuContext } from "../../context/MenuContext";
import { GoDash } from "react-icons/go";

const MainLayout = ({ children }) => {
  const { open } = useContext(MenuContext);
  return (
    <div className="bg-white  min-h-screen">
      <MainHeader />

      <div className="flex justify-start items-start ">
        <aside className="bg-white rounded-lg w-60 h-screen border border-gray-200">
          <ul>
            <li className="flex justify-start items-center hover:cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <IoHomeSharp className="mr-2" />
              <Link href="/">Dashboard</Link>
            </li>
            <li className="flex flex-col justify-start items-start p-2">
              <div className="w-full flex flex-row justify-start items-center">
                <FaShoppingCart className="mr-2" />
                <a href="/Products" className="flex-1">
                  Products
                </a>
                <FaChevronDown />
              </div>
            </li>
            <ul className="ml-8 mt-4">
              <li className="flex justify-center items-center gap-1  hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
                <GoDash />
                <Link href="/Products/ProductsList">Products List</Link>
              </li>
            </ul>
            <li className="flex justify-start items-center hover:cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <BiSolidCategory className="mr-2" />
              <a href="/Categories" className="flex-1">
                Categories
              </a>
              <FaChevronDown />
            </li>
          </ul>
        </aside>
        <main className="w-screen">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
