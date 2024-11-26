import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/vrv logo.jpg' ;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Access current location


  return (
    <div className="flex flex-col md:flex-row md:h-screen">
      {/* Sidebar */}
      <div className={`bg-dark-1 text-white md:w-64 w-full hidden md:flex flex-col justify-start md:h-auto ${isOpen ? 'h-auto' : 'h-0 md:h-auto'} md:relative absolute top-0 left-0 z-50`}>
        <div className="flex flex-row space-y-4 p-4 md:flex-col  text-center ">
        <div className="flex flex-col items-center  p-4">
        <img src={logo} alt="Logo" className="w-24 h-24 mb-11 rounded-sm" />
          <p className="text-lg font-bold md:mb-7 text-center">Welcome, Admin</p>
          </div>
          
          <NavLink to='/manageUsers' className={({isActive}) => (isActive || location.pathname === '/') ? 'bg-dark-3 font-semibold rounded-md p-2' : 'font-semibold p-2'}>Users</NavLink>
          <NavLink to='/manageRoles' className={({isActive}) => isActive ? 'bg-dark-3 font-semibold rounded-md p-2' : 'font-semibold p-2'}>Roles</NavLink>
        </div>
      </div>

    
        {/* Top Navbar on small screens */}
        <div className="md:hidden flex justify-between items-center bg-dark-1 text-white p-4">
        <img src={logo} alt="Logo" className="w-12 h-12 rounded-md" />
        <div className="flex justify-end ">
            <NavLink to='/manageUsers' className={({isActive}) => isActive ? 'bg-dark-3 font-semibold rounded-md p-2 px-6' : 'font-semibold p-2 px-6'}>Users</NavLink>
            <NavLink to='/manageRoles' className={({isActive}) => isActive ? 'bg-dark-3 font-semibold rounded-md p-2 px-6' : 'font-semibold p-2 px-6'}>Roles</NavLink>
        </div>
        </div>
        
      </div>
  );
};

export default Sidebar;
