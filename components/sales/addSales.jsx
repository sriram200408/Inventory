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
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  const notify = () => toast("Success");
  const errorify = () => toast("Error submitting data");

  async function handleSubmit(event) {
    event.preventDefault();
    const productData = {
      date: date,
      refno: refno,
      customer: customer,
      amount: amount,
      phone: phone,
    };

    try {
      await axios.post("http://localhost:3033/Sales", productData);
      notify();
      setTimeout(() => {
        setSubmitted(true);
      }, 1000);
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
          setAmount(amount + existingProduct.price);
          toast("product added ");

        } else {
          const newBillingProduct = { ...fetchedProduct, quantity: 1 };
          setBillingProducts([...billingProducts, newBillingProduct]);
          setAmount(amount + newBillingProduct.price);
          toast("product added");
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
      <div className="p-3 h-20 items-center flex justify-center w-full m-5 mb-10">
        <label className="mr-2 font-semibold">Enter Serial No:</label>
        <input
          type="text"
          placeholder="Serial No..."
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
          className="w-6/12 p-2 border border-gray-300 rounded-xl m-2"
        />
        <button
          className="bg-blue-500 text-white rounded-xl hover:scale-105 p-2"
          onClick={() => { handleFetchData(); setSerialNo(""); }}
        >
          Add Product
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded"
          />
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
        </div>
        <span className="block mb-4">
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products
        </span>
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="text-left p-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-left p-2 flex items-center cursor-pointer" onClick={() => handleSort("name")}>
                Product
              </TableHead>
              <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("code")}>
                Serial No
              </TableHead>
              <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("category")}>
                Category
              </TableHead>
              <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("quantity")}>
                Quantity
              </TableHead>
              <TableHead className="p-2 cursor-pointer" onClick={() => handleSort("price")}>
                Price
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="p-2">
                  <input
                    type="checkbox"
                    checked={!!selectedProducts[product.id]}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell className="p-2">{product.name}</TableCell>
                <TableCell className="p-2">{product.code}</TableCell>
                <TableCell className="p-2">{product.category}</TableCell>
                <TableCell className="p-2">{product.quantity}</TableCell>
                <TableCell className="p-2">{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="p-5">
        <h1 className="text-3xl font-bold mb-5">Billing Form</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between">
            <div className="w-5/12">
              <Label htmlFor="date">Date:</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-5/12">
              <Label htmlFor="refno">Ref No:</Label>
              <Input
                id="refno"
                type="text"
                value={refno}
                onChange={(e) => setRefno(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-5/12">
              <Label htmlFor="customer">Customer:</Label>
              <Input
                id="customer"
                type="text"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="w-5/12">
              <Label htmlFor="phone">Phone:</Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="amount">Total Amount:</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200"
            />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-green-500 text-white rounded p-3 hover:scale-105"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>

      <div className="max-w-7xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Added Products</h2>
        <Table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <TableHeader>
            <TableRow>
              <TableHead className="p-2">Product</TableHead>
              <TableHead className="p-2">Serial No</TableHead>
              <TableHead className="p-2">Category</TableHead>
              <TableHead className="p-2">Quantity</TableHead>
              <TableHead className="p-2">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billingProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="p-2">{product.name}</TableCell>
                <TableCell className="p-2">{product.code}</TableCell>
                <TableCell className="p-2">{product.category}</TableCell>
                <TableCell className="p-2">{product.quantity}</TableCell>
                <TableCell className="p-2">{product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <ToastContainer />
    </>
  );
}
