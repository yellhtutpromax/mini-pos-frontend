'use client'

import {Button, Card, Skeleton, Spinner} from "@nextui-org/react";
import Image from 'next/image';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {useEffect} from "react";
dayjs.extend(relativeTime);

const StockBlock = ({stock, onEdit, onPrint}) => {
  return (
    <>
      <div
        onClick={() => onEdit(stock)} key={stock.id}
        className="bg-background border border-themeBorder w-full min-h-32 rounded p-2">
        <div className="flex items-start justify-between mt-3">
          <div>
            <div className="font-bold text-base">{stock.name}</div>
            <div className="my-1">
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
              onPress={() => onPrint(stock)}
            >
              <div className="text-left text-danger text-base font-semibold">Barcode</div>
            </Button>
          </div>
        </div>
        <div className="border border-themeBorder my-2"></div>
        <div className="my-2 flex items-start justify-between h-40">
          <div className="left-card w-[40%] h-40 overflow-hidden rounded-xl">
            <div className="flex items-center justify-center w-full h-40 bg-background border-1 rounded-xl border-themeBorder">
              {stock.photo !== null ? (
                <Image
                  alt={stock.name}
                  // className="object-cover"
                  src={`/uploads/stocks/${stock.photo}`} // Fixed the src path
                  width={120} // Provide a numeric value for width
                  height={120} // Provide a numeric value for height
                  style={{ width: "auto", height: "auto" }}
                  priority={true}
                />
              ) : (
                <div className="text-gray-500">No Photo</div>
              )}
            </div>
          </div>
          <div className="righ-card">
            <div className="flex items-center justify-between">
              <div className="text-base text-gray-400">Buy Amount &nbsp;&nbsp;</div>
              <div className="text-base text-gray-400">{Number(stock.buy_amount).toLocaleString()} MMK</div>
            </div>
            <div className="flex items-center justify-between mt-1 mb-3">
              <div className="text-base">Sell Amount &nbsp;&nbsp;</div>
              <div className="text-base">{Number(stock.sell_amount).toLocaleString()} MMK</div>
            </div>
            <p className="text-end text-sm text-gray-400">
              Quantity: {Number(stock.quantity)} pcs
            </p>
          </div>
        </div>
        <div className="border border-themeBorder my-2"></div>
        <div className="flex justify-between items-start text-sm text-gray-500">
          <div className="flex flex-col justify-start items-start mb-2">
            <div>Created At:</div>
            <div>{new Date(stock.created_at).toLocaleString()}</div>
          </div>
          <div className="flex flex-col justify-start items-start">
            <div>Updated At:</div>
            <div>{dayjs(stock.updated_at).fromNow()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StockBlock;
