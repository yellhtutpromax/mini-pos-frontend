'use client';

import { Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { navDb } from "@/app/constants/constants";
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { NavsLoop } from "@/app/components/General/NavsLoop";

export const Sidebar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the sidebar if clicked outside
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen bg-background overflow-hidden">
        <div className="flex items-center justify-center h-20">
          <div className="text-4xl font-bold">MESOFT</div>
        </div>
        <Divider className="w-11/12 m-auto" />
        <div className="nav-container mt-4">
          <NavsLoop />
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden flex items-center justify-center h-20 z-10 absolute">
        <button
          className={`p-4 focus:outline-none ml-2 ${isMenuOpen ? 'hidden' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-2">
            <div className="w-9 h-0.5 rounded bg-white"></div>
            <div className="w-9 h-0.5 rounded bg-white"></div>
            <div className="w-9 h-0.5 rounded bg-white"></div>
          </div>
        </button>

        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 w-64 h-screen bg-yellow z-50 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-center h-20">
            <div className="text-4xl font-bold">MESOFT</div>
          </div>
          <Divider className="w-11/12 m-auto" />
          <div className="w-64 h-screen bg-background overflow-hidden z-10 absolute">
            <NavsLoop />
          </div>
        </div>
      </div>
    </>
  );
};
