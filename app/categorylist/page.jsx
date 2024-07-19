import React from 'react'
import CategoryLists from '@/components/categories/categoryList'

const page = () => {
  return (
    <div className="bg-white rounded-lg mx-4 p-4 border border-gray-200">
      <h1>Categories List Page</h1>
      <br />
      <br />

      <CategoryLists />
    </div>
  )
}

export default page
