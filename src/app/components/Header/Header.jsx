import React from "react";
import {Image} from "@nextui-org/image";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react"
import {logout} from "@/app/auth/login/actions";
import {navDb} from "@/app/constants/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";


const Header = React.memo(({authUser}) => {
  // console.clear()
  // console.table(authUser)
  console.log('Header is rendered ' + Math.floor(Math.random() * (99999 - 9999 + 1)) + 9999)
  const pathname = usePathname();

  return (
    <>
      <header className="bg-background">
        <div className="sm:w-themeContainer bg-background w-full mx-auto h-20 shadow fixed bottom-0 z-50 sm:z-auto sm:relative sm:bottom-auto">
          <div className="w-11/12 md:w-full border border-white mx-auto bg-background h-20 flex justify-between items-center">
            {navDb.map((navItem) => {
              const isActive = pathname === `/${navItem.route}`;
              return (
                <div className=" border border-bg-yellow-600">
                  <Link
                      key={navItem.id}
                      href={`/${navItem.route}`}
                      className={`flex items-center justify-center mt-7 w-20 mx-auto h-12 px-4 rounded-lg mb-4 cursor-pointer transition ${
                          isActive ? "bg-navActive" : "hover:bg-navActive"
                      }`}
                  >
                    <div className="bg-themeBg">
                      <Image
                          className="text-white w-12 h-12"
                          alt={navItem.name}
                          src={`/icons/nav-icons/${navItem.iconPath}`}
                      />
                    </div>
                  </Link>
                </div>
              );
            })}

            {/*<div className="bg-themeBg">*/}
            {/*  <Dropdown placement="bottom-end">*/}
            {/*    <DropdownTrigger className="cursor-pointer">*/}
            {/*      <Image*/}
            {/*          className="text-white w-12 h-12"*/}
            {/*          alt="Notifications"*/}
            {/*          src="/icons/user_default.png"*/}
            {/*      />*/}
            {/*    </DropdownTrigger>*/}
            {/*    <DropdownMenu className="bg-background border-0" aria-label="Profile Actions" variant="flat">*/}
            {/*      <DropdownItem key="profile" className="h-14 gap-2">*/}
            {/*        <p className="font-semibold">Signed in as ( {authUser.name} )</p>*/}
            {/*        <p className="font-semibold">{authUser.email}</p>*/}
            {/*      </DropdownItem>*/}
            {/*      <DropdownItem key="settings">My Settings</DropdownItem>*/}
            {/*      <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>*/}
            {/*      <DropdownItem key="logout" onClick={logout} color="danger" className="text-danger">*/}
            {/*        Log Out*/}
            {/*      </DropdownItem>*/}
            {/*    </DropdownMenu>*/}
            {/*  </Dropdown>*/}
            {/*</div>*/}
          </div>
        </div>
      </header>
      {/*<Divider/>*/}
    </>
  );
});

export default Header
