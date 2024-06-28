"use client"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Label } from "@/components/ui/label"
  import { Textarea } from "@/components/ui/textarea"
  import { Button } from "@/components/ui/button"




  export  function AddProducts () {
    
    return (
        <>
        <div id="areawrap" className="rounded-xld border-black m-4">
        <div>
            <h2 className="font-bold ">Add Product</h2>
        </div>
        <div className="mt-12">
        <Label className="mb-5">Product</Label>

            <Select className="">
              <SelectTrigger className="w-full">
              <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Exclusive">Exclusive</SelectItem>
                 <SelectItem value="combo">Inclusive</SelectItem>
                  <SelectItem value="digital">Digital</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
              </SelectContent>
             </Select>
        </div>
        <div className="flex mt-10">
          <div className="col-span-1 w-6/12 ">
        <Label >Name</Label>
            <Input className="mt-1"/>
            </div>
            <div className="col-span-1 w-6/12 ml-10">
            <Label >Code</Label>
            <Input className="mt-1"/>
            </div>
        </div>
        <div className=" mt-7 flex">
        <div className=" w-6/12">
        <Label className="mb-5">Barcode Symbology</Label>

            <Select className="mt-1">
              <SelectTrigger className="w-full">
              <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CRE-M01">CRE-M01</SelectItem>
                 <SelectItem value="MOM-S02">MOM-S02</SelectItem>
                  <SelectItem value="TIS-M01">TIS-M01</SelectItem>
                  <SelectItem value="SDE-W02">SDE-W02</SelectItem>
                  <SelectItem value="WAP-P609">WAP-P609</SelectItem>
                 <SelectItem value="DIS-T01">DIS-T01</SelectItem>
                  <SelectItem value="LOD-A01">LOD-A01</SelectItem>
                  <SelectItem value="QOS-I03">QOS-I03</SelectItem>
              </SelectContent>
             </Select>
        </div>
        <div className=" w-6/12 ml-10">
        <Label className="mb-5">Category</Label>

            <Select className="mt-1">
              <SelectTrigger className="w-full">
              <SelectValue placeholder="Product Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beauty">Beauty</SelectItem>
                 <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="furniture">Furniture</SelectItem>
                  <SelectItem value="toys">Toys</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                 <SelectItem value="cosmetics">Cosmetics</SelectItem>
                  <SelectItem value="grocery">Grocery</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
              </SelectContent>
             </Select>
        </div>
        </div>
        <div className="flex mt-7">
          <div className="col-span-1 w-6/12 ">
            <Label className="mb-5">Cost</Label>
            <Input className="mt-1"/>
            </div>
            <div className="col-span-1 w-6/12 ml-10">
            <Label className="mb-5">Price</Label>
            <Input className="mt-1"/>
            </div>
        </div>
        <div className="mt-12">
        <Label className="mb-5">Tax Method</Label>
            <Select className="mt-1">
              <SelectTrigger className="w-full">
              <SelectValue placeholder="Tax Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Exclusive</SelectItem>
                 <SelectItem value="Inclusive">Inclusive</SelectItem>
              </SelectContent>
             </Select>
        </div>
        <div className="mt-7">
        <Label className="mb-5" >Quantity</Label>
            <Input className="mt-1"/>
        </div>
        <div className="mt-5">
          <Label className="mb-5">Product details/Description</Label>
          <Textarea className="mt-1"/>
        </div>
        <div className="flex">
        <Button variant="outline" className="mt-5 hover:bg-green-500 hover:text-white">Add Product</Button>
        <Button variant="outline"className="mt-5 ml-5 hover:bg-blue-500 hover:text-white">Reset</Button>


        </div>
        </div>
        </>
    );
  }
  
