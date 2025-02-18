"use client"
import {Select, SelectItem, Avatar, Chip} from "@heroui/react";

const StockSearch = ({optionItems}) => {
  return (
    <Select
      classNames={{
        base: "w-full",
        trigger: "min-h-12 py-2 border border-themeBorder",
      }}
      onSelectionChange
      isMultiline={true}
      items={optionItems}
      label="Assigned to"
      labelPlacement="outside"
      placeholder="Select a user"
      renderValue={(items) => {
        return (
          <>
            {items.map((item) => (
              <Chip className="mr-2 mb-2" key={item.key}>{item.data.name}</Chip>
            ))}
          </>
        );
      }}
      selectionMode="multiple"
      variant="bordered"
    >
      {(item) => (
        <SelectItem
          key={item.id}
          textValue={item.name}
          className="my-3">
          <div className="flex gap-2 items-center">
            <Avatar
              alt={item.name}
              className="flex-shrink-0"
              size="sm"
              src={`/uploads/stocks/${item.photo}`} // Fixed the src path
            />
            <div className="flex flex-col">
              <span className="text-small">{item.name}</span>
              <span className="text-tiny text-gray-600">{item.barcode}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}

export default StockSearch;
