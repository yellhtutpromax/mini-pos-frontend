'use client'
import {useState} from "react";
import {Card, Table} from "@nextui-org/react";
import {Image} from "@nextui-org/image";
import ThemeDataTable from "@/app/components/Table/ThemeDataTable";

const Inventory = () => {
  const [isFollowed, setIsFollowed] = useState(false);
  console.log('Inventory')
  return (
    <>
      <div className="flex items-center justify-between h-10 mb-5">
        <div className="text-2xl font-bold">Inventory</div>
        <a href="" className="flex justify-between items-center w-52">
          <Image
            className="w-5 h-5"
            alt="Plus sign"
            src={`/icons/plus.svg`}
          />
          <div className="text-themeSecondary text-base font-semibold">Register new member</div>
        </a>
      </div>
      <div className="h-[calc(100vh-5rem-170px)]">
        <Card className="w-full h-full border border-themeBorder bg-foreground">
          <div className="p-5">
            <ThemeDataTable/>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Inventory;
