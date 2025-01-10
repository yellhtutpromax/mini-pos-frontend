'use client';

import { Divider } from "@nextui-org/react";
import { Image } from "@nextui-org/image";
import { navDb } from "@/app/constants/constants";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const Sidebar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 h-screen bg-background overflow-hidden">
        <div className="flex items-center justify-center h-20">
          <div className="text-4xl font-bold">MESOFT</div>
        </div>
        <Divider className="w-11/12 m-auto" />
        <div className="nav-container mt-4">
          <a
            key={'sidebar'}
            className={`flex items-center justify-between w-56 mx-auto h-12 px-4 rounded-lg mb-2 cursor-pointer transition`}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 flex items-center justify-center">
                <Image
                  className="w-9 h-9"
                  alt={'Sidebar'}
                  src={`/icons/nav-icons/sidebar.svg`}
                />
              </div>
              <span className={`text-gray-500 text-sm`}>
                    Close Sidebar
              </span>
            </div>
          </a>
          <Divider className="w-11/12 m-auto mb-3" />
          {navDb.map((navItem) => {
            const isActive = pathname === `/${navItem.route}`;
            return (
              // <>
                <a
                  key={navItem.id}
                  href={`/${navItem.route}`}
                  className={`flex items-center justify-between w-56 mx-auto h-12 px-4 rounded-lg mb-4 cursor-pointer transition ${
                    isActive ? "bg-navActive" : "hover:bg-navActive"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex items-center justify-center">
                      <Image
                        className="w-9 h-9"
                        alt={navItem.name}
                        src={`/icons/nav-icons/${navItem.iconPath}`}
                      />
                    </div>
                    <span className={`${isActive ? "text-white" : "text-gray-500"} text-sm font-semibold`}>
                    {navItem.name}
                  </span>
                  </div>
                </a>
              // </>
            );
          })}
        </div>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="lg:hidden bg-white h-20">
        <button
          className="p-4 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-2">
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
            <div className="w-6 h-0.5 bg-black"></div>
          </div>
        </button>

        <div
          className={`fixed top-0 left-0 w-64 h-screen bg-yellow und z-50 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Cancel Button */}
          <button
            className="absolute top-4 right-4 p-2 text-white bg-gray-700 rounded-full focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
          >✕</button>
          <div className="flex items-center justify-center h-20">
            <div className="text-4xl font-bold">MESOFT</div>
          </div>
        </div>
      </div>
    </>
  );
};
