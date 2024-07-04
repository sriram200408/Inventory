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
import { useRouter } from "next/navigation";
import productsData from "../../db.json";
import axios from "axios";

export function TableDemo() {
  const [products, setProducts] = useState(productsData.Products);
  const [selectedProducts, setSelectedProducts] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [sortedProducts, setSortedProducts] = useState(productsData.Products);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [editProduct, setEditProduct] = useState(null);

  const router = useRouter();

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

  const handleDeleteProduct = (id) => {
    deleteData(id);
  };

  const handleDeleteSelectedProducts = () => {
    Object.keys(selectedProducts).forEach((id) => {
      deleteData(id);
    });
    setSelectedProducts({});
    setSelectAll(false);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    updateData(updatedProduct);
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

  function updateData(updatedProduct) {
    axios
      .put(
        `http://localhost:3031/Products/${updatedProduct.id}`,
        updatedProduct
      )
      .then((response) => {
        const newData = products.map((product) => {
          if (product.id === updatedProduct.id) {
            return response.data;
          }
          return product;
        });
        setProducts(newData);
        setSortedProducts(newData);
        setEditProduct(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function deleteData(id) {
    axios
      .delete(`http://localhost:3031/Products/${id}`)
      .then(() => {
        const newData = products.filter((product) => product.id !== id);
        setProducts(newData);
        setSortedProducts(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const redirectPage = () => {
    router.push("/Products/addproducts");
  };

  return (
    <>
      <button
        className="bg-blue-500 text-white rounded-xl absolute right-20 hover:scale-105 top-14 p-2"
        onClick={redirectPage}
      >
        AddProduct +
      </button>

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
                Barcode
              </TableHead>
              <TableHead
                className="hover:cursor-pointer"
                onClick={() => handleSort("quantity")}
              >
                Quantity
              </TableHead>
              <TableHead
                className="hover:cursor-pointer"
                onClick={() => handleSort("price")}
              >
                Amount
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={!!selectedProducts[product.id]}
                    onChange={() => handleSelectProduct(product.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.barcodeSymbology}</TableCell>
                <TableCell className="ml-8">{product.quantity}</TableCell>
                <TableCell>${product.price}</TableCell>

                <TableCell className="text-right">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="mr-2 px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
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
                  hidden={currentPage === 1}
                  className="px-2 py-1 border border-gray-300 rounded mr-2"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handleChangePage(currentPage + 1)}
                  hidden={currentPage === totalPages}
                  className="px-2 py-1 border border-gray-300 rounded ml-2"
                >
                  Next
                </button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        {Object.keys(selectedProducts).length > 0 && (
          <button
            onClick={handleDeleteSelectedProducts}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete Selected
          </button>
        )}

        {editProduct && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
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
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
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
                  value={editProduct.barcodeSymbology}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      barcodeSymbology: e.target.value,
                    })
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
    </>
  );
}
