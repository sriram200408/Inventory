"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import MainHeader from "../common/header/Header";
import { AiOutlineHome } from "react-icons/ai";
import { FaAngleRight, FaAngleDown, FaCheck } from "react-icons/fa";
import { SiHelpscout, SiSinglestore } from "react-icons/si";
import { MenuContext } from "../../components/common/MenuContext";

const Sidebar = ({ children }) => {
  const { open } = useContext(MenuContext);
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [salesOpen, setSalesOpen] = useState(false);
  const [transactionsOpen, setTransactionsOpen] = useState(false);

  const toggleProducts = () => setProductsOpen(!productsOpen);
  const toggleCategories = () => setCategoriesOpen(!categoriesOpen);
  const toggleSales = () => setSalesOpen(!salesOpen);
  const toggleTransactions = () => setTransactionsOpen(!transactionsOpen);

  return (
    <div className="bg-white">
      <MainHeader />
      <aside className="bg-slate-700 text-white z-30 dark:bg-slate-600 dark:text-white top-0 justify-start left-0 lg:fixed lg:block rounded-lg inset-y-0 border border-gray-200 shadow-sm w-2/12">
        <div className="h-10 p-3">
          <img
            src="https://fervidsmart.com/dist/assets/img/logo/Fervid_Logo_svg.svg"
            alt="Fervid Logo"
          />
        </div>
        <div className="justify-evenly col-span-2 w-full">
          <ul className="mt-16">
            <li className="w-full cursor-pointer flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <AiOutlineHome className="mr-2" />
              <Link href="/dashboard">Dashboard</Link>
            </li>

            <li className="flex flex-col justify-start items-start rounded-xl p-2">
              <div
                className="w-full flex flex-row justify-start items-center cursor-pointer"
                onClick={toggleProducts}
              >
                <FaCheck className="mr-2" />
                <h3 className="flex-1 ">Products</h3>
                {productsOpen ? <FaAngleDown /> : <FaAngleRight />}
              </div>
              {productsOpen && (
                <ul className="pl-8 mt-2">
                  <li className="cursor-pointer flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 w-full">
                    <SiSinglestore />
                    <Link href="/productslist" className="ml-2">
                      Products List
                    </Link>
                  </li>
                  <li className="cursor-pointer flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
                    <SiSinglestore />
                    <Link href="/addproducts" className="ml-2">
                      Add Products
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="flex flex-col justify-start items-start rounded-xl p-2">
              <div
                className="w-full flex flex-row justify-start items-center cursor-pointer"
                onClick={toggleCategories}
              >
                <FaCheck className="mr-2" />
                <h3 className="flex-1">Categories</h3>
                {categoriesOpen ? <FaAngleDown /> : <FaAngleRight />}
              </div>
              {categoriesOpen && (
                <ul className="pl-8 mt-2">
                  <li className="cursor-pointer flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
                    <SiSinglestore />
                    <Link href="/categorylist" className="ml-2">
                      List Category
                    </Link>
                  </li>
                  <li className="cursor-pointer flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
                    <SiSinglestore />
                    <Link href="/addcategories" className="ml-2">
                      Add Category
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="flex flex-col justify-start items-start rounded-xl p-2">
              <div
                className="w-full flex flex-row justify-start items-center cursor-pointer"
                onClick={toggleSales}
              >
                <FaCheck className="mr-2" />
                <h3 className="flex-1">Sale</h3>
                {salesOpen ? <FaAngleDown /> : <FaAngleRight />}
              </div>
              {salesOpen && (
                <ul className="pl-8 mt-2">
                  <li className="cursor-pointer flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
                    <SiSinglestore />
                    <Link href="/saleslist" className="ml-2">
                      List Sale
                    </Link>
                  </li>
                  <li className="cursor-pointer flex justify-start items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
                    <SiSinglestore />
                    <Link href="/addSales" className="ml-2">
                      Add Sale
                    </Link>
                  </li>
                </ul>
              )}
            </li>
           

            
          </ul>
        </div>
      </aside>

      <div className="absolute inset-y-0 right-0 w-5/6 top-24">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
