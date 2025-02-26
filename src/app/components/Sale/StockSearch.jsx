"use client"

import {useEffect, useState} from "react"
import {Select, SelectItem, Avatar, Chip} from "@heroui/react"

const StockSearch = ({optionItems, mutantObject, isHide= false, selectedItems}) => {

  const [selectedIds, setSelectedIds] = useState([])

  const toArray = (input) => {
    if (typeof input === "string") {
      // Split by commas and filter out any empty strings that result from multiple commas
      return input.split(",").map(Number).filter(Boolean)
    }
    return Array.isArray(input) ? input : input ? [input] : [] // Only wrap non-empty input in an array
  }

  const selectIsChanged = (currentSelected) => {
    const convertedArray = toArray(currentSelected)
    setSelectedIds(convertedArray)
    selectedItems(convertedArray)
  }

  useEffect(() => {
    if (mutantObject && Array.isArray(mutantObject)) {
      const newSelectedIds = mutantObject.map(item => item.id).join(',')

      // Only update state if there is an actual change
      if (newSelectedIds !== selectedIds.join(',')) {
        // console.log("Updated selection:", newSelectedIds)
        selectIsChanged(newSelectedIds)
      }
    }
  }, [JSON.stringify(mutantObject)]) // Use JSON.stringify to compare object changes safely


  return (
    <div className={`${isHide?'hidden':'visible'} w-full md:w-3/4 md:mx-auto`}>
      <Select
        classNames={{
          base: "w-full ",
          trigger: "border border-themeBorder",
        }}
        onChange={(e) => selectIsChanged(e.target.value)}
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
                <Chip
                  className={`m-1 bg-background border border-themeBorder chip-id${item.data.id}`}
                  key={item.key.toString()}>{item.data.name}
                </Chip>
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
                <span className="text-tiny mt-2 text-gray-600">{item.barcode}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  )
}

export default StockSearch
