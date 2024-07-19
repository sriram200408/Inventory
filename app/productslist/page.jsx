
import { TableDemo } from "@/components/products/ProductsList";
import React from "react";


const ProductsListPage = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 border border-gray-200">
      <h1>Products List Page</h1>
      <br />
      <br />

      <TableDemo />
    </div>
  );
};

export default ProductsListPage;
