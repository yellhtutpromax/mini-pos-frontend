import {Divider} from "@nextui-org/react";

export const Sidebar = () => {
  return (
    <>
      {/*<div className="min-h-screen flex">*/}
        <div className="md:w-64 h-screen bg-background">
          <div className="flex items-center justify-center h-20">
            <h1 className="text-4xl">LOGO</h1>
          </div>
          <Divider className="w-11/12 m-auto" />
          {/*<h4 className="text-white">This is sidebar ....</h4>*/}
        </div>
      {/*</div>*/}
    </>
  )
}
