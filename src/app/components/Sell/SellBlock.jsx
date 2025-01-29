'use client'

import {Button, Card, Skeleton} from "@nextui-org/react";

const SellBlock = ({sale, loading, onSell, fetchLoading}) => {
  let stock = sale.stock
  return (
    <>
      {!loading ? (
        <div
          // onClick={() => onEdit(sale)}
          key={sale.id}
          className="bg-background border border-themeBorder w-full min-h-32 rounded p-2">
          <div className="flex items-start justify-between mt-3">
            <div>
              <div className="font-bold text-base">{stock.name}</div>
              <div className="my-3">
                {sale.voucher_codes ? (
                  <p className="text-sm text-gray-400">Voucher ID: {sale.voucher_codes}</p>
                ) : (
                  <p className="text-sm text-gray-400">No Voucher available</p>
                )}
              </div>
            </div>
            <div>
              <Button
                className="bg-transparent border border-warning-300"
                // onPress={() => onSell(sale)}
              >
                <div className="text-left text-warning-300 text-base font-semibold">Edit</div>
              </Button>
            </div>
          </div>
          <div className="border border-themeBorder my-2"></div>
          <div className="my-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg text-white">Quantity:</div>
              <div className="text-lg text-white">
                <span
                  className="text-sm text-gray-500">{`Original Amount ${Number(sale.unit_price).toLocaleString()} MMK * `}</span>
                {`${Number(sale.quantity)} Pcs`}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-lg text-white">Total:</div>
              <div className="text-lg text-white">{Number(sale.total_amount).toLocaleString()} MMK</div>
            </div>
            <div className="flex items-start justify-between mt-8 mb-4">
              <div className="text-lg text-white w-32">Notes:</div>
              <div className="text-base text-gray-400 flex-1">{sale.notes}</div>
            </div>

          </div>
          <div className="border border-themeBorder my-2"></div>
          <div className="flex justify-between items-start text-sm text-gray-400">
            <div className="flex flex-col justify-start items-start mb-2">
              <div>Date:</div>
              <div>{new Date(sale.sell_date).toLocaleDateString()}</div>
            </div>
            {/*<div className="flex flex-col justify-start items-start">*/}
            {/*  <div>Updated At:</div>*/}
            {/*  <div>{new Date(stock.updated_at).toLocaleString()}</div>*/}
            {/*</div>*/}
          </div>
        </div>
      ) : (
        <Card className="bg-background border border-themeBorder w-full min-h-32 rounded p-2">
          <div className="flex items-start justify-between mt-3">
            <div className="w-full">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-6 w-3/5 rounded-lg bg-background"/>
              </Skeleton>
              <div className="my-3">
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-4 w-4/5 rounded-lg bg-background"/>
                </Skeleton>
              </div>
            </div>
            <div>
              <Skeleton className="w-20 rounded-lg">
                <div className="h-10 w-20 rounded-lg bg-background"/>
              </Skeleton>
            </div>
          </div>
          <Skeleton className="w-full rounded-lg my-2">
            <div className="h-px w-full rounded-lg bg-background"/>
          </Skeleton>
          <div className="my-4">
            <div className="flex items-center justify-between">
              <Skeleton className="w-1/4 rounded-lg">
                <div className="h-5 w-1/4 rounded-lg bg-background"/>
              </Skeleton>
              <Skeleton className="w-1/4 rounded-lg">
                <div className="h-5 w-1/4 rounded-lg bg-background"/>
              </Skeleton>
            </div>
            <div className="flex items-center justify-between mt-1 mb-3">
              <Skeleton className="w-1/4 rounded-lg">
                <div className="h-5 w-1/4 rounded-lg bg-background"/>
              </Skeleton>
              <Skeleton className="w-1/4 rounded-lg">
                <div className="h-5 w-1/4 rounded-lg bg-background"/>
              </Skeleton>
            </div>
            <Skeleton className="w-1/3 rounded-lg">
              <div className="h-4 w-1/3 rounded-lg bg-background"/>
            </Skeleton>
          </div>
          <Skeleton className="w-full rounded-lg my-2">
            <div className="h-px w-full rounded-lg bg-background"/>
          </Skeleton>
          <div className="flex justify-between items-start text-sm">
            <div className="flex flex-col justify-start items-start mb-2 w-1/2">
              <Skeleton className="w-1/3 rounded-lg">
                <div className="h-4 w-1/3 rounded-lg bg-background"/>
              </Skeleton>
              <Skeleton className="w-2/3 rounded-lg mt-1">
                <div className="h-4 w-2/3 rounded-lg bg-background"/>
              </Skeleton>
            </div>
            <div className="flex flex-col justify-start items-start w-1/2">
              <Skeleton className="w-1/3 rounded-lg">
                <div className="h-4 w-1/3 rounded-lg bg-background"/>
              </Skeleton>
              <Skeleton className="w-2/3 rounded-lg mt-1">
                <div className="h-4 w-2/3 rounded-lg bg-background"/>
              </Skeleton>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default SellBlock;
