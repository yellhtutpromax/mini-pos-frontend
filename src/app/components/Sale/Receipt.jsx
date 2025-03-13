"use client";

import React, { useEffect, useState } from "react";
import { fetchReceipts } from "@/app/(admin)/sale/receipt/action";
import { Loading } from "@/app/components/Loading";
import {Button} from "@nextui-org/react";
import {DateRangePicker} from "@heroui/react";

const Receipt = () => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReceipts = async () => {
      try {
        const response = await fetchReceipts();
        if (response.success) {
          setReceipts(response.data);
        } else {
          setError(response.message || "Failed to fetch receipts.");
        }
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    getReceipts();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;

  const viewDetails = (receipt) => {
    console.clear()
    console.table(receipt)
  }

  return (
    <>
      <DateRangePicker
        calendarProps={{
          classNames: {
            base: "bg-background",
            headerWrapper: "pt-4 bg-background",
            prevButton: "border-1 border-default-200 rounded-small",
            nextButton: "border-1 border-default-200 rounded-small",
            gridHeader: "bg-background shadow-none border-b-1 border-default-100",
            cellButton: [
              "data-[today=true]:bg-default-300 data-[today=true]:text-white data-[selected=true]:bg-transparent rounded-small",
              // start (pseudo)
              "data-[range-start=true]:before:rounded-l-small",
              "data-[selection-start=true]:before:rounded-l-small",
              // end (pseudo)
              "data-[range-end=true]:before:rounded-r-small",
              "data-[selection-end=true]:before:rounded-r-small",
              // start (selected)
              "data-[selected=true]:data-[selection-start=true]:data-[range-selection=true]:rounded-small",
              // end (selected)
              "data-[selected=true]:data-[selection-end=true]:data-[range-selection=true]:rounded-small",
            ],
          },
        }}
        className="w-full"
        aria-label="Search between date"  // ✅ Add this to prevent undefined error
        label="Search between date"
        variant="bordered"
      />
      <div className="w-full mt-3">
        {receipts.length === 0 ? (
          <p className="text-gray-600 text-center">No receipts available.</p>
        ) : (
          <div className="space-y-7">
            {receipts.map((receipt) => (
              <div
                key={receipt.receipt_code}
                className="bg-foreground border border-themeBorder rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out p-4 relative overflow-hidden"
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-themeSecondary"></div>
                {/* Receipt Code */}
                <div className="flex items-center justify-between h-18 border-b border-themeBorder py-3 mb-4">
                  <div className="text-lg  text-themeSecondary ">
                    Code: <span className="text-white">{receipt.receipt_code}</span>
                  </div>
                  <div className="">
                    <Button className="bg-default border border-themeBorder" onPress={viewDetails(receipt)}>
                      <div className="text-left text-gray-50 text-base font-semibold">Details</div>
                    </Button>
                  </div>
                </div>
                {/* Grid for receipt details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="font-medium text-white">Total Amount:</div>
                  <div className="text-right text-gray-500">{receipt.total_amount} MMK</div>
                  <div className="font-medium text-white">Final Amount:</div>
                  <div className="text-right text-gray-500">{receipt.final_amount} MMK</div>
                  <div className="font-medium text-white">Deposit:</div>
                  <div className="text-right text-gray-500">{receipt.deposit || "0.00"} MMK</div>
                  <div className="font-medium text-white">Discount:</div>
                  <div className="text-right text-gray-500">{receipt.discount || "0.00"} MMK</div>
                  <div className="font-medium text-white">Date:</div>
                  <div className="text-right text-gray-500">
                    {new Date(receipt.sell_date).toLocaleDateString()}
                  </div>
                </div>
                {/* Notes Section */}
                {receipt.notes && (
                  <div className="mt-4 pt-4 border-t border-themeBorder">
                    <div className="font-medium text-white">Notes:</div>
                    <p className="text-sm text-gray-500">{receipt.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Receipt;
