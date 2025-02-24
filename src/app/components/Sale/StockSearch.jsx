"use client"

import {useEffect, useState} from "react"
import {Select, SelectItem, Avatar, Chip} from "@heroui/react"

const StockSearch = ({optionItems, isHide= false, selectedItems}) => {

  const [selectedIds, setSelectedIds] = useState([2,4])

  const toArray = (input) => {
    if (typeof input === "string") {
      // Split by commas and filter out any empty strings that result from multiple commas
      return input.split(",").map(Number).filter(Boolean)
    }
    return Array.isArray(input) ? input : input ? [input] : [] // Only wrap non-empty input in an array
  }

  const selectIsChanged = (e) => {
    console.clear()
    const currentSelected = e.target.value
    const convertedArray = toArray(currentSelected)
    setSelectedIds(convertedArray)
    selectedItems(convertedArray)
    // console.table(convertedArray)
  }

  useEffect(() => {
    console.clear()
    selectedItems(selectedIds); // Call with the initial state
  }, []);

  return (
    <div className={`${isHide?'hidden':'visible'} w-full md:w-3/4 md:mx-auto`}>
      <Select
        classNames={{
          base: "w-full",
          trigger: "border border-themeBorder",
        }}
        onChange={selectIsChanged}
        isMultiline={true}
        items={optionItems}
        label="Assigned to"
        labelPlacement="outside"
        placeholder="Select stocks"
        selectedKeys={selectedIds.map(String)} // Ensure selected keys are strings
        renderValue={(items) => {
          return (
            <>
              {items.map((item) => (
                <Chip className="m-1 bg-background border border-themeBorder" key={item.key.toString()}>{item.data.name}</Chip>
              ))}
            </>
          )
        }}
        selectionMode="multiple"
        variant="bordered"
      >
        {(item) => (
          <SelectItem
            key={item.id}
            textValue={item.name}
            className="">
            <div className="flex items-center">
              <div className="mr-2">
                <Avatar
                  className="w-[45px] h-[45px] rounded-none bg-none"
                  size="sm"
                  src={`/uploads/stocks/${item.photo}`} // Fixed the src path
                  alt={item.name}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-small">{item.name}</span>
                <span className="text-tiny text-gray-600">{item.barcode}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  )
}

export default StockSearch
