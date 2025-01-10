import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  User
} from "@nextui-org/react";
import {Logo} from "./Logo.jsx";
import {SearchIcon} from "./SearchIcon.jsx";
import {logout} from "@/app/auth/login/actions";

const Header = ({authUser}) => {
  // console.clear()
  // console.table(authUser)
  return (
    <Navbar className="shadow">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Logo />
          <p className="hidden sm:block font-bold text-white">ACME</p>
        </NavbarBrand>
        <NavbarContent className="text-white hidden sm:flex gap-3">
          <NavbarItem isActive>
            <Link className="text-white" href="/dashboard" aria-current="page">
              Dashboard
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white" href="/members">
              Member
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              }}
              className="transition-transform text-white"
              description={authUser.role}
              name={authUser.name || 'Name'}
            />
            classNames={classNames}
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem onClick={logout} key="logout" color="danger">Log Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default Header
