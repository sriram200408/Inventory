"use client";
import React, { useContext } from "react";
import MainHeader from "../common/header/Header";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MenuContext } from "../../components/common/MenuContext";
import { GoDash } from "react-icons/go";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";


const Sidebar = ({ children }) => {
  const { open } = useContext(MenuContext);
  return (
    <div className="bg-white ">
      <MainHeader />

      <div className="flex justify-start items-start ">
        <aside className="bg-white rounded-lg absolute inset-y-0 left-0 border border-gray-200 shadow-sm w-2/12">
          <div className="h-12 w-48 absolute left-16 top-4 ">
            <Image fill={true} src="https://fervidsmart.com/dist/assets/img/logo/Fervid_Logo_svg.svg"></Image>
          </div>
          <div className="flex justify-start items-center cursor-pointer  rounded-xl absolute top-20 left-10">
            <IoHomeSharp className="mr-2" />
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className="absolute top-32 w-48 left-10">
          <ul>
              <li className="cursor-pointer hover:bg-slate-200 hover:focus:bg-slate-200">Product</li> 
              <li><Link href="/Products/productslist"> Products List</Link></li>
              <li><Link href="/Products/addproducts">Add Product</Link></li>
              <li><a href="https://google.com" className="cursor-pointer">
                    Products{" "}
                  </a></li>            
                </ul>
          </div>
        </aside>
        <div className="absolute inset-y-0 right-0 w-5/6 top-24">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
