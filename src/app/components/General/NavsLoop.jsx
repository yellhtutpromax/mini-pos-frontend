import {navDb} from "@/app/constants/constants";
import {Image} from "@nextui-org/image";
import {usePathname} from "next/navigation";
import {Divider} from "@nextui-org/react";

export const NavsLoop = () => {
  const pathname = usePathname();
  return (
    <>
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
      <Divider className="w-11/12 m-auto mb-3"/>
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
    </>
  )
}
