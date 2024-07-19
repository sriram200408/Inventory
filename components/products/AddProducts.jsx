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
import { TableDemo } from "./ProductsList";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import data from "../../categoriesdb.json";
import data1 from "../../barcodeSymbologies.json"
import data2 from "../../productTypes.json"
import data3 from "../../taxMethods.json"

export default function AddProducts() {
  const [productType, setProductType] = useState('');
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [barcodeSymbology, setBarcodeSymbology] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [taxMethod, setTaxMethod] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryData, setCategoryData] = useState(data.Categories);
  const [barcodeData , setBarcodeData] = useState(data1.barcodes);
  const [producttype,setproducttype] = useState(data2.productTypes);
  const [taxMethods , setTaxMethods] = useState(data3.taxMethods);
  

  const notify = () => toast("Success");
  const errorify = () => toast("Error submitting data");



  async function handleSubmit(event) {
    event.preventDefault();
    const productData = {
      productType: productType,
      name: name,
      code: code,
      barcodeSymbology: barcodeSymbology,
      category: category,
      cost: parseFloat(cost),
      price: parseFloat(price),
      taxMethod: taxMethod,
      quantity: parseInt(quantity),
      description: description,
    };

    try {
      await axios.post("http://localhost:3031/Products", productData);
      notify();
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
    } catch (error) {
      errorify();
    }
  }
  if (submitted) {
    redirect(`/productslist`);
  }

  return (
    <div id="areawrap" className="rounded-xld border-black m-4 z-0">
      <ToastContainer />
      <div>
        <h2 className="font-bold">Add Product</h2>
      </div>
      <form onSubmit={handleSubmit}>
        
        <div className="flex mt-10">
          <div className="col-span-1 w-6/12">
            <Label>Name</Label>
            <Input
              className="mt-1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 w-6/12 ml-10">
            <Label>Serial No</Label>
            <Input
              className="mt-1"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
        </div>
        
          
          <div className="w-full mt-2">
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
                  
                  <SelectItem key={category.id} value={`${category.brand}-${category.name}`}>
                    {`${category.brand}-${category.name}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        
        <div className="flex mt-7">
          <div className="col-span-1 w-6/12">
            <Label className="mb-5">Cost</Label>
            <Input
              className="mt-1"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
          </div>
          <div className="col-span-1 w-6/12 ml-10">
            <Label className="mb-5">Price</Label>
            <Input
              className="mt-1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="mt-7">
          <Label className="mb-5">Quantity</Label>
          <Input
            className="mt-1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="mt-5">
          <Label className="mb-5">Product details/Description</Label>
          <Textarea
            className="mt-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex">
          <Button
            type="submit"
            variant="outline"
            className="mt-5 hover:bg-white hover:text-green-500 bg-green-500 text-white"
          >
            Add Product
          </Button>
          <Button
            type="button"
            variant="outline"
            className="mt-5 ml-5 hover:bg-white hover:text-blue-600 bg-blue-600 text-white"
            onClick={() => {
              setProductType("");
              setName("");
              setCode("");
              setBarcodeSymbology("");
              setCategory("");
              setCost("");
              setPrice("");
              setTaxMethod("");
              setQuantity("");
              setDescription("");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
