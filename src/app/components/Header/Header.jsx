import {Image} from "@nextui-org/image";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react"
import {logout} from "@/app/auth/login/actions";


const Header = ({authUser}) => {
  console.clear()
  console.table(authUser)
  return (
    <>
      <header className="bg-background">
        <div className="w-themeContainer mx-auto h-20 shadow">
          <div className="float-right">
            <div className="flex justify-between items-center w-40 h-20">
              <div className="bg-themeBg">
                <Image
                  className="text-white w-9 h-9"
                  alt="Notifications"
                  src="/icons/noti.png"
                />
              </div>
              <div className="bg-themeBg">
                <Image
                  className="text-white w-9 h-9"
                  alt="Notifications"
                  src="/icons/browser.png"
                />
              </div>
              <div className="bg-themeBg">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger className="cursor-pointer">
                    <Image
                      className="text-white w-9 h-9"
                      alt="Notifications"
                      src="/icons/user_default.png"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2 border border-themeBorder">
                      <p className="font-semibold">Signed in as ( {authUser.name} )</p>
                      <p className="font-semibold">{authUser.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" onClick={logout} color="danger" className="text-danger">
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/*<Divider/>*/}
    </>
  );
}

export default Header
