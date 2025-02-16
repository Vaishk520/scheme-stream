import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {  
  const [showName, setShowName] = useState(false); 

  return (
    <div className="flex justify-between bg-white py-4">
      <div>
        <h1 style={{ color: '#30347c' }} className='text-3xl font-bold mr-4 ml-4'>SchemeStream</h1>
      </div>

      <div className='mr-10'>
        <ul style={{ color: "#30347c" }} className='flex items-center gap-6'>
          <Link to="/"><li className='hover:text-red-400 duration-300 hover:underline'>Home</li></Link>
          <Link to="/applications"><li className='hover:text-red-400 duration-300 hover:underline'>Applications</li></Link>
          <Link to="/grievances"><li className='hover:text-red-400 duration-300 hover:underline'>Grievances</li></Link>

          <div className="relative flex flex-col items-center">
            {user ? (
              <Link to="/user"
                onMouseEnter={() => setShowName(true)}  
                onMouseLeave={() => setShowName(false)} 
                className="relative flex flex-col items-center"
              >
                <img src={user.picture} alt="User" 
                  className="w-10 h-10 rounded-full border-2 border-[#30347c] hover:opacity-80 transition cursor-pointer" />
                
                {showName && (
                  <div className="absolute top-12 bg-gray-700 text-white text-sm px-3 py-1 rounded-md shadow-md">
                    {user.name}  
                  </div>
                )}
              </Link>
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-700 font-bold">U</span>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
