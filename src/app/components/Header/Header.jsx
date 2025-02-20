import React from "react";
import {Image} from "@nextui-org/image";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Divider} from "@nextui-org/react"
import {logout} from "@/app/auth/login/actions";
import {navDb} from "@/app/constants/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";


const Header = React.memo(({authUser}) => {
  // console.clear()
  // console.table(authUser)
  console.log('Header is rendered ' + Math.floor(Math.random() * (99999 - 9999 + 1)) + 9999)
  const pathname = usePathname();

  return (
    <>
      <header
        className="w-full md:w-3/4 md:mx-auto md:mb-5 md:rounded-b-xl overflow-hidden bg-background border border-themeBorder sm:w-themeContainer min-h-5 shadow fixed bottom-0 z-50 left-1/2 transform -translate-x-1/2">
        <div className="sm:w-themeContainer mx-auto flex justify-between items-center">
          {navDb.map((navItem) => {
            const isActive = pathname === `/${navItem.route}`;
            const activeIconPath = isActive ? 'active/' : '/';
            return (
              <div key={navItem.id}>
                {isActive && (
                  <Divider className="w-20 h-0.5 bg-indigo-500 rounded"/>
                )}
                <div className="flex items-center h-full mt-3">
                  <Link
                    key={navItem.id}
                    href={`/${navItem.route}`}
                    className={`flex items-center justify-center w-20 mx-auto h-9 mb-4 cursor-pointer  transition-transform duration-300 ease-in-out ${
                      isActive ? "scale-105" : "scale-85"
                    }`}
                  >
                    <div className="bg-themeBg flex flex-col items-center justify-between">
                      <Image
                        className="text-white w-7 h-7"
                        alt={navItem.name}
                        src={`/icons/nav-icons/${activeIconPath}${navItem.iconPath}`}
                      />
                      <div
                        className={`text-xs ${isActive ? "text-themeSecondary" : "text-gray-400"}`}>
                        {navItem.name}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </>
  );
});

export default Header
