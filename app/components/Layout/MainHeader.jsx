"use client";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { MenuContext } from "../../context/MenuContext";
import SelectBox from "./SelectBox";
import { Input } from "@/components/ui/input";
import LanguageSelectBox from "./LanguageSelectBox";

const MainHeader = () => {
  const { toggle } = useContext(MenuContext);
  return (
    <div className="bg-white flex  items-center px-4 h-12 mb-4">
      <div onClick={toggle}>
        <FaBars className="cursor-pointer" />
      </div>
      <div className="w-3/12 flex ml-10">
        <Input placeholder="Search" />
      </div>

      <div className="">
        <LanguageSelectBox />
      </div>
      <div className="">
        <SelectBox />
      </div>
    </div>
  );
};

export default MainHeader;
