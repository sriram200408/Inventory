"use client";
import React, { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
import { AiFillDollarCircle } from "react-icons/ai";
import dynamic from "next/dynamic";
import TransactionChart from "./transactionChart";

const PieCharts = dynamic(() => import("./pieChart"), { ssr: false });
const Charts = dynamic(() => import("./charts"), { ssr: false });

const Page = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; 
  }

  return (
    <>
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
        <div className="bg-gray-100 rounded-lg mx-4 p-4 flex gap-4 w-full">
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
              <FaShoppingBag className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span>Total Sales</span>
              <div>
                <strong>$24,500.90</strong>
                <span className="text-green-400">+$350</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-400">
              <FaBox className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span>Items Sold</span>
              <div>
                <strong>3K</strong>
                <span className="text-green-400">+233</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
              <AiFillDollarCircle className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span>Total Cost</span>
              <div>
                <strong>$38,229.74</strong>
                <span className="text-green-400">+$732</span>
              </div>
            </div>
          </BoxWrapper>
        </div>
      </div>
      
      <BoxWrapper>
        <div className="flex ">
          <div className=" mt-5 rounded-xl ml-5 border-black border-2"><Charts /></div>
          <div className=" ml-10 rounded-xl mt-2 border-black border-2"><TransactionChart /></div>
        </div>
      </BoxWrapper>
      <div className="justify-center flex relative"> <h1 >TOP PRODUCTS </h1></div>
    
      <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center h-56">
        <div className="bg-gray-100 rounded-lg mx-4 p-4 flex gap-4 w-full h-52">
          <BoxWrapper>
            
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
              <FaShoppingBag className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span>PRODUCT 1</span>
              <div>
                <strong>$24,500.90</strong>
                <span className="text-green-400">+$350</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-400">
              <FaBox className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span>PRODUCT 2</span>
              <div>
                <strong>3K</strong>
                <span className="text-green-400">+233</span>
              </div>
            </div>
          </BoxWrapper>
          <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
              <AiFillDollarCircle className="text-2xl text-white" />
            </div>
            <div className="pl-4">
              <span>PRODUCT 3</span>
              <div>
                <strong>$38,229.74</strong>
                <span className="text-green-400">+$732</span>
              </div>
            </div>
          </BoxWrapper>
        </div>
      </div>

    </>
  );
};

export default Page;

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
