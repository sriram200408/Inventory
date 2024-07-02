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


const initialProducts = [
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
  const [products, setProducts] = useState(Products);
  const [selectedProducts, setSelectedProducts] = useState(
    new Array(Products.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(Products);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editProduct, setEditProduct] = useState(null);

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


  const handleDeleteProduct = (code) => {
    const updatedProducts = Products.filter((product) => product.code !== code);
    setProducts(updatedProducts);
    setSortedProducts(updatedProducts);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.code === updatedProduct.code ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setSortedProducts(updatedProducts);
    setEditProduct(null);
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
          to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
          {filteredProducts.length} Products
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
              className=" hover:cursor-pointer"
              onClick={() => handleSort("price")}
            >
              Amount
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteProduct(product.code)}
                  className="px-2 py-1 bg-red-500 text-white rounded "
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8} className="text-right">
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

      {editProduct && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <h2 className="mb-4">Edit Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateProduct(editProduct);
              }}
            >
              <input
                type="text"
                placeholder="Product Name"
                value={editProduct.product}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, product: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Code"
                value={editProduct.code}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, code: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded"
              />

              <input
                type="text"
                placeholder="Category"
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, category: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Brand"
                value={editProduct.brand}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, brand: e.target.value })
                }
                className="mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={editProduct.quantity}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    quantity: parseFloat(e.target.value),
                  })
                }
                className="mb-2 p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="mb-2 p-2 border border-gray-300 rounded"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
