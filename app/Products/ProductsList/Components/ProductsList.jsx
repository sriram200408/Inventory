"use client";
import { useState } from "react";
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
import { RiArrowUpDownFill } from "react-icons/ri";

export const Products = [
  {
    id: 1,
    product: "Organic cream",
    code: "INV001",
    price: 250.0,
    category: "Beauty",
    brand: "Lakme",
    quantity: 2.0,
  },
  {
    id: 2,
    product: "Umbrella",
    code: "INV002",
    price: 150.0,
    category: "Grocery",
    brand: "Sun",
    quantity: 1.0,
  },
  {
    id: 3,
    product: "Coffe beans",
    code: "INV003",
    price: 350.0,
    category: "Food",
    brand: "Nescafe",
    quantity: 3.0,
  },
  {
    id: 4,
    product: "Nike Shoes",
    code: "INV004",
    price: 450.0,
    category: "Shoes",
    brand: "Nike",
    quantity: 1.0,
  },
  {
    id: 5,
    product: "Levis jeans",
    code: "INV005",
    price: 550.0,
    category: "Clothing",
    brand: "Levis",
    quantity: 4.0,
  },
  {
    id: 6,
    product: "Book Shelf",
    code: "INV006",
    price: 200.0,
    category: "Furniture",
    brand: "Vintage",
    quantity: 1.0,
  },
  {
    id: 7,
    product: "Computer Glasses",
    code: "INV007",
    price: 300.0,
    category: "Frames",
    brand: "Ray-Ban",
    quantity: 1.0,
  },
];

export function TableDemo() {
  const [selectedProducts, setSelectedProducts] = useState(
    new Array(Products.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(Products);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedProducts(new Array(Products.length).fill(newSelectAll));
  };

  const handleSelectProduct = (index) => {
    const newSelectedProducts = [...selectedProducts];
    newSelectedProducts[index] = !newSelectedProducts[index];
    setSelectedProducts(newSelectedProducts);
    setSelectAll(newSelectedProducts.every((selected) => selected));
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
    product.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <Table>
        <TableCaption>Product List</TableCaption>
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
              className="text-left flex items-center"
              onClick={() => handleSort("product")}
            >
              Product
              <RiArrowUpDownFill className="ml-1" />
            </TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Brand Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product, index) => (
            <TableRow key={product.code}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedProducts[index]}
                  onChange={() => handleSelectProduct(index)}
                />
              </TableCell>
              <TableCell className="font-medium">{product.product}</TableCell>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell className="ml-8">{product.quantity}</TableCell>
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
