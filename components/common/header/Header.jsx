"use client";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { MenuContext } from "../MenuContext";
import SelectBox from "../header/SelectBox";
import { Input } from "@/components/ui/input";
import LanguageSelectBox from "../header/LanguageSelectBox";

const MainHeader = () => {
  const { toggle } = useContext(MenuContext);
  return (
    <>
      <div className="bg-white flex  items-center px-4 h-12 mb-4">
        <div className="w-2/6 flex absolute left-80 mt-5 ml-5">
          <Input placeholder="Search" />
        </div>

        <div className="right-56 mt-3 absolute">
          <LanguageSelectBox />
        </div>
        <div className=" absolute right-28 mt-3 ml-4">
          <SelectBox />
        </div>
      </div>
    </>
  );
};

export default MainHeader;
