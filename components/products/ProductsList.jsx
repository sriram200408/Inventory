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
import  Products  from "../../db.json"


export function TableDemo() {
  const [selectedProducts, setSelectedProducts] = useState(
    new Array(Products.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(Products);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

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

  const filteredProducts = sortedProducts.Products.filter((product) =>
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
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="mb-4 flex justify-between">
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value, 10));
            setCurrentPage(1); // Reset to the first page when items per page changes
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
          to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
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
              onClick={() => handleSort("product")}
            >
              Product
            </TableHead>
            <TableHead
              className=" hover:cursor-pointer"
              onClick={() => handleSort("code")}
            >
              Code
            </TableHead>
            <TableHead
              className="hover:cursor-pointer"
              onClick={() => handleSort("category")}
            >
              Category
            </TableHead>
            <TableHead
              className="hover:cursor-pointer"
              onClick={() => handleSort("brand")}
            >
              Brand Name
            </TableHead>
            <TableHead
              className="hover:cursor-pointer"
              onClick={() => handleSort("quantity")}
            >
              Quantity
            </TableHead>
            <TableHead
              className="text-right hover:cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProducts.map((product, index) => (
            <TableRow key={product.code}>
              <TableCell>
                <input
                  type="checkbox"
                  checked={selectedProducts[index]}
                  onChange={() => handleSelectProduct(index)}
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.barcodeSymbology}</TableCell>
              <TableCell className="ml-8">{product.quantity}</TableCell>
              <TableCell className="text-right">
                ${product.price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7} className="text-right">
              <button
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border border-gray-300 rounded mr-2"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border border-gray-300 rounded ml-2"
              >
                Next
              </button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
