"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function AddSales() {
  const [date, setDate] = useState('');
  const [refno, setRefno] = useState("");
  const [biller, setBiller] = useState("");
  const [customer, setCustomer] = useState("");
  const [orderTax, setOrderTax] = useState("");
  const [orderDiscount, setOrderDiscount] = useState("");
  const [amount, setAmount] = useState("");
  const [saleStatus, setSaleStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [saleNote, setSaleNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [phone, setPhone] = useState("")

  

  const notify = () => toast("Success");
  const errorify = () => toast("Error submitting data");



  async function handleSubmit(event) {
    event.preventDefault();
    const productData = {
      date: date,
      refno: refno,
      customer: customer,
      amount: amount,
      phone:phone,
    };

    try {
      await axios.post("http://localhost:3033/Sales", productData);
      notify();
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
    } catch (error) {
      errorify();
    }
  }
  if (submitted) {
    redirect(`/saleslist`);
  }

  return (
    <div id="areawrap" className="rounded-xld border-black m-4 z-0">
      <ToastContainer />
      <div>
        <h2 className="font-bold">Add Sales</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-12">
          <Label className="mb-5">Date</Label>
          <Input
            
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1"
         />
          
        </div>
        <div className="flex mt-10">
          <div className="col-span-1 w-6/12">
            <Label>Enter Ref No</Label>
            <Input
              className="mt-1"
              value={refno}
              onChange={(e) => setRefno(e.target.value)}
              required
            />
          </div>
          
        </div>
        <div className="mt-7 flex">
          <div className="w-6/12">
            <Label className="mb-5">Customer</Label>
            <Input
              onChange={(e) => setCustomer(e.target.value)}
              value={customer}
              className="mt-1"
            >
            </Input>
          </div>
          <div className="w-6/12 ml-10">
            <Label className="mb-5">Phone no</Label>
            <Input
              onChange={(e) => {setPhone(e.target.value)}}
              value={phone}
              className="mt-1"
            >
            </Input>
          </div>
        </div>
        
        
       
        <div className="flex">
          <Button
            type="submit"
            variant="outline"
            className="mt-5 hover:bg-white hover:text-green-500 bg-green-500 text-white"
          >
            Add Sale
          </Button>
          <Button
            type="button"
            variant="outline"
            className="mt-5 ml-5 hover:bg-white hover:text-blue-600 bg-blue-600 text-white"
            onClick={() => {
              setDate("");
              setRefno("");
              setBiller("");
              setCustomer("");
              setOrderTax("");
              setOrderDiscount("");
              setAmount("");
              setSaleStatus("");
              setPaymentStatus("");
              setSaleNote("");
              setPhone("");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
