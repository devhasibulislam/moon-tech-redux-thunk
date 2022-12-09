import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='col-span-2 bg-indigo-200 h-[calc(100vh-25px)] p-5 rounded-lg'>
      <ul className='flex gap-3  flex-col h-full'>
        <li className="font-medium text-lg overflow-hidden text-ellipsis whitespace-nowrap">Admin Dashboard</li>
        <li>
          <Link to='/dashboard' className="overflow-hidden text-ellipsis whitespace-nowrap">Product List</Link>
        </li>
        <li>
          <Link to='add-product' className="overflow-hidden text-ellipsis whitespace-nowrap"> Add Product </Link>
        </li>
        <li className='mt-auto'>
          <Link to='/' className="overflow-hidden text-ellipsis whitespace-nowrap"> Back to Home </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
