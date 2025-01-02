import {
  Divider
} from "@nextui-org/react";
import {Logo} from "./Logo.jsx";

const Header = ({authUser}) => {
  // console.clear()
  // console.table(authUser)
  return (
    <>
      <header className="bg-background">
        <div className="w-themeContainer mx-auto"  style={{height: 80}}>

        </div>
      </header>
      <Divider/>
    </>
  );
}

export default Header
