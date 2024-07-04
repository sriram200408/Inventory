import React from 'react'
import { FaShoppingBag } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { AiFillDollarCircle } from 'react-icons/ai';


const Dashboard = () => {
  return (
    <>
    <div className="bg-gray-100 rounded-lg mx-4 p-4 flex gap-4 z-10">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <FaShoppingBag className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span>Total Sales</span>
          <div>
            <strong>$24500.90</strong>
            <span className="text-green-400">+$350</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-400">
          <FaBox className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span>Items Sold</span>
          <div>
            <strong>3K</strong>
            <span className="text-green-400">+233</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
          <AiFillDollarCircle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span>Total Cost</span>
          <div>
            <strong>$38229.74</strong>
            <span className="text-green-400">+$732</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
    </>
  )
}

export default Dashboard

function BoxWrapper ({children}) {
  return ( <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>)
}
