"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import data from "../../categories.json";
import data1 from "../../barcodeSymbologies.json"
import data2 from "../../productTypes.json"
import data3 from "../../taxMethods.json"

export default function AddCategories() {
  const [productType, setProductType] = useState('');
  const [name, setName] = useState("");
  const [variant, setVariant] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [taxMethod, setTaxMethod] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryData, setCategoryData] = useState(data.categories);
  const [barcodeData , setBarcodeData] = useState(data1.barcodes);
  const [producttype,setproducttype] = useState(data2.productTypes);
  const [taxMethods , setTaxMethods] = useState(data3.taxMethods);
  

  const notify = () => toast("Success");
  const errorify = () => toast("Error submitting data");



  async function handleSubmit(event) {
    event.preventDefault();
    const productData = {
     
      name: name,
      variant: variant,
      brand: brand,
      
    };

    try {
      await axios.post("http://localhost:3032/Categories", productData);
      notify();
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
    } catch (error) {
      errorify();
    }
  }
  if (submitted) {
    redirect(`/categorylist`);
  }

  return (
    <div id="areawrap" className="rounded-xld border-black m-4 z-0">
      <ToastContainer />
      <div>
        <h2 className="font-bold">ADD CATEGORY</h2>
      </div>
      <form onSubmit={handleSubmit}>
       
        
        <div className=" mt-10">
          <div className="col-span-1 w-6/12">
            <Label> Product Name</Label>
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            
            />
        </div>
          </div>
          <div className="col-span-1 w-6/12 ">
            <Label>Brand</Label>
            <Input
              className="mt-1"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 w-6/12 ">
            <Label>Variant</Label>
            <Input
              className="mt-1"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              required
            />
          </div>
          {/* <div className="col-span-1 w-6/12 ">
            <Label>Quantity</Label>
            <Input
              className="mt-1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div> */}
          
        {/* <div className="mt-7 flex">
       
          <div className="w-6/12 ">
            <Label className="mb-5">Category</Label>
            <Select
              onValueChange={(value) => {setSelectedCategory(value);setCategory(value)}}
              value={selectedCategory}
              className="mt-1"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categoryData.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div> */}
        
          
        
        
        
        
        <div className="flex">
          <Button
            type="submit"
            variant="outline"
            className="mt-5 hover:bg-white hover:text-green-500 bg-green-500 text-white"
          >
            Add Category
          </Button>
          <Button
            type="button"
            variant="outline"
            className="mt-5 ml-5 hover:bg-white hover:text-blue-600 bg-blue-600 text-white"
            onClick={() => {
              
              setName("");
              setVariant("");
              setBrand("");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
