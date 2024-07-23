"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";

export default function Billing() {
  const [serialNo, setSerialNo] = useState("");
  const [products, setProducts] = useState([]);
  const [billingProducts, setBillingProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [date, setDate] = useState('');
  const [refno, setRefno] = useState("");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
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

  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:3031/Products")
      .then(response => {
        setProducts(response.data);
        setSortedProducts(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3031/Products?code=${serialNo}`
      );
      if (response.data.length > 0) {
        const fetchedProduct = response.data[0];
        const existingProduct = billingProducts.find(
          (product) => product.code === serialNo
        );

        if (existingProduct) {
          const updatedBillingProducts = billingProducts.map((product) =>
            product.code === serialNo
              ? { ...product, quantity: product.quantity + 1 }
              : product
          );
          setBillingProducts(updatedBillingProducts);
        } else {
          const newBillingProduct = { ...fetchedProduct, quantity: 1 };
          setBillingProducts([...billingProducts, newBillingProduct]);
          await axios.post(`http://localhost:3034/Products`, newBillingProduct);
        }
      } else {
        alert("No data found");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    const newSelectedProducts = {};
    if (newSelectAll) {
      paginatedProducts.forEach((product) => {
        newSelectedProducts[product.id] = true;
      });
    }
    setSelectedProducts(newSelectedProducts);
  };

  const handleSelectProduct = (id) => {
    const newSelectedProducts = { ...selectedProducts };
    if (newSelectedProducts[id]) {
      delete newSelectedProducts[id];
    } else {
      newSelectedProducts[id] = true;
    }
    setSelectedProducts(newSelectedProducts);
    setSelectAll(
      paginatedProducts.every((product) => newSelectedProducts[product.id])
    );
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    const sortedArray = [...sortedProducts].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSortedProducts(sortedArray);
  };

  const handleCheckout = async () => {
    try {
      for (const product of billingProducts) {
        const existingProduct = products.find((p) => p.id === product.id);
        const newQuantity = existingProduct.quantity - product.quantity;

        if (newQuantity > 0) {
          await axios.patch(
            `http://localhost:3031/Products/${product.id}`,
            { quantity: newQuantity }
          );
        } else {
          await axios.delete(`http://localhost:3031/Products/${product.id}`);
        }
      }

      // Clear billing.json by deleting each product individually
      for (const product of billingProducts) {
        await axios.delete(`http://localhost:3034/Products/${product.id}`);
      }

      setBillingProducts([]);
      alert("Checkout completed successfully!");
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const filteredProducts = sortedProducts.filter((product) =>
    Object.values(product).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleChangePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
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
              setCustomer("");
              setAmount("");
              setPhone("");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
      <div className=" p-3 h-20 items-center  flex justify-center  w-full m-5 mb-10 ">
        <label >Enter Serial No</label>
        <input 
          type="text"
          placeholder="Serial No..."
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          className=" w-6/12 p-2 border border-gray-300 rounded-xl m-2"
        />
        
        <button
          className="bg-blue-500 text-white rounded-xl hover:scale-105 p-1 object-right-bottom "
          onClick={handleFetchData}
        >
          Add Product
        </button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <div className="mb-4 flex justify-between">
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
            className="p-2 border border-gray-300 rounded"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <span>
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredProducts.length
            )}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredProducts.length)}{" "}
            of {filteredProducts.length} Products
          </span>
        </div>
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableHead>
              <TableHead
                className="text-left flex items-center hover:cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Product
              </TableHead>
              <TableHead
                className="hover:cursor-pointer"
                onClick={() => handleSort("code")}
              >
                Serial No
              </TableHead>
              <TableHead
                className="hover:cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category
              </TableHead>
              <TableHead
                className="hover:cursor-pointer"
                onClick={() => handleSort("quantity")}
              >
                Quantity
              </TableHead>
             
              <TableHead className="text-left">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedProducts[product.id] || false}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-gray-300 rounded"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </div>

      <div>
        <h2>Billing Table</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Serial No</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {billingProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleCheckout}
        >
          Checkout
        </button>
      </div>
    </>
  );
}
