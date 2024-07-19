import React from 'react'
import { ListSales } from '@/components/sales/listSales'

const page = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 border border-gray-200">
    <h1>Sales List Page</h1>
    <br />
    <br />

    <ListSales />
  </div>
  )
}

export default page
