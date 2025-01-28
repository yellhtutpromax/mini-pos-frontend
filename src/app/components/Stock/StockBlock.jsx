'use client'

import {Button} from "@nextui-org/react";

const StockBlock = ({stock, onEdit, onSell}) => {
  return(
    <>
      <div onClick={() => onEdit(stock)} key={stock.id}
           className="bg-background border border-themeBorder w-full min-h-32 rounded p-2 "
      >
        <div className="flex items-start justify-between mt-3">
          <div>
            <div className="font-bold text-base">{stock.name}</div>
            <div className="my-3">
              {stock.barcode ? (
                <p className="text-sm text-gray-400">Barcode: {stock.barcode}</p>
              ) : (
                <p className="text-sm text-gray-400">No barcode available</p>
              )}
            </div>
          </div>
          <div>
            <Button
              className="bg-transparent border border-danger-300"
              onPress={() => onSell(stock)}
            >
              <div className="text-left text-danger text-base font-semibold">Sell</div>
            </Button>
          </div>
        </div>
        <div className="border border-themeBorder my-2"></div>
        <div className="my-4">
          <div className="flex items-center justify-between">
            <div className="text-lg text-gray-400">Buy Amount:</div>
            <div className="text-lg text-gray-400">{Number(stock.buy_amount).toLocaleString()} MMK</div>
          </div>
          <div className="flex items-center justify-between mt-1 mb-3">
            <div className="text-lg">Sell Amount:</div>
            <div className="text-lg">{Number(stock.sell_amount).toLocaleString()} MMK</div>
          </div>
          <p className="text-sm text-gray-400">
            Quantity: {Number(stock.quantity)} pcs
          </p>
        </div>
        <div className="border border-themeBorder my-2"></div>
        <div className="flex justify-between items-start text-sm text-gray-500">
          <div className="flex flex-col justify-start items-start mb-2">
            <div>Created At:</div>
            <div>{new Date(stock.created_at).toLocaleString()}</div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div>Updated At:</div>
            <div>{new Date(stock.updated_at).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StockBlock
