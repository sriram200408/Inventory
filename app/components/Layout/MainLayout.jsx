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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const MainLayout = ({ children }) => {
  const { open } = useContext(MenuContext);
  return (
    <div className="bg-white  min-h-screen">
      <MainHeader />

      <div className="flex justify-start items-start ">
      
        <aside className="bg-white rounded-lg absolute inset-y-0 left-0 border border-gray-200 shadow-sm w-2/12">
        <div className="h-4 w-48 absolute left-16 top-4 ">
        <img src="https://fervidsmart.com/dist/assets/img/logo/Fervid_Logo_svg.svg"></img>
        </div>
        <div className="flex justify-start items-center cursor-pointer  rounded-xl absolute top-20 left-10">
              <IoHomeSharp className="mr-2" />
              <Link href="/">Dashboard</Link>
            </div>
        <div className="absolute top-32 w-48 left-10">
          <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Products</AccordionTrigger>
    <AccordionContent>
     <a href="/Products/ProductsList"> Products List</a>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Categories</AccordionTrigger>
    <AccordionContent>
      <a href="https://google.com" className="cursor-pointer">Products </a>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Sales</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-4">
    <AccordionTrigger>Purchases</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>


          </div>
        </aside>
        <div className="absolute inset-y-0 right-0 w-5/6 top-24">
        <main >{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
