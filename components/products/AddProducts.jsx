"use client"
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

  export  function AddProducts () {
    return (
        <>
        <div>
            <h2>Add Product</h2>
        </div>
        <div>
            <h3>Product Type *</h3>
            <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Product Type" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="standard">Standard</SelectItem>
    <SelectItem value="combo">Combo</SelectItem>
    <SelectItem value="digital">Digital</SelectItem>
    <SelectItem value="service">Service</SelectItem>
  </SelectContent>
</Select>

        </div>
        <div>
            <h3>Name *</h3>
            <Input/>
            <h3>Code *</h3>
            <Input/>
        </div>
        </>
    );
  }
  
