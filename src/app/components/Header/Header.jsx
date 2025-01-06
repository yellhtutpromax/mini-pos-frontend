import {
  Divider
} from "@nextui-org/react";
import {Logo} from "./Logo.jsx";
import {Sidebar} from "@/app/components/General/Sidebar";

const Header = ({authUser}) => {
  // console.clear()
  // console.table(authUser)
  return (
    <>
      <header className="bg-background">
        <div className="w-themeContainer mx-auto h-20">
          <div className="flex">
            <div className=""></div>
          </div>
        </div>
      </header>
      <Divider/>
    </>
  );
}

export default Header
