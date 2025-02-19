"use client"

import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import {fetchStockByBarcode} from "@/app/(admin)/sale/action"
import StockSearch from "@/app/components/Sale/StockSearch";
import {Button, Divider, Spinner} from "@nextui-org/react";
import {ThemeInput} from "@/app/components/Form/Input/ThemeInput";
import {Input} from "@nextui-org/input";
import {useDisclosure} from "@heroui/modal";
import SellStock from "@/app/components/Stock/SellStock";

// Dynamically import the scanner to avoid SSR issues
const BarcodeScannerComponent = dynamic(
  () => import('react-qr-barcode-scanner'),
  { ssr: false }
)

const Sell = () => {

  const [optionItems, setOptionItems] = useState([]);
  const [scannedData, setScannedData] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [product, setProduct] = useState(null)
  const [cameraError, setCameraError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0)
  const [searchInputHidden, setSearchInputHidden] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedStock, setSelectedStock] = useState(null)
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false)

  const {isOpen: isSellModalOpen, onOpen: onSellModalOpen, onOpenChange: onSellModalOpenChange} = useDisclosure()

  const getStockByBarcode = async (barcode='210803416064341') => {
    const response = await fetchStockByBarcode(barcode)
    console.log(response)
    if (response.success) {
      setProduct(response.data)
      // setScannedData(result.text)
      // setIsScanning(false)
      // fetchProductData(result.text)
    }
  }

  const handleScan = async (result) => {
    console.log(result)
    if (result) {
      setScannedData(result.text);
      setIsScanning(false);

      // Fetch product information from the API
      const response = await fetchStockByBarcode('210803416064341')
      const productData = await response.json();
      setProduct(productData);
    }
  };

  const handleError = async (err) => {
    const response = await fetchStockByBarcode('210803416064341')
    setProduct(response.data);
    // console.log(err);
    // if (err.name === 'NotFoundError') {
    //   setCameraError('No camera found. Please ensure your device has a camera and it is accessible.');
    // } else {
    //   setCameraError('Error accessing camera. Please grant permission and try again.');
    // }
  };

  // Function to handle quantity change
  const handleQuantityChange = (itemId, value) => {
    // Ensure the value is a non-negative number
    const newQuantity = Math.max(0, Number(value));
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  // Calculate the total amount
  const calculateTotal = () => {
    return optionItems.reduce((total, item) => {
      if (selectedIds.includes(item.id)) {
        const qty = quantities[item.id] || 0;
        return total + qty * Number(item.sell_amount);
      }
      return total;
    }, 0);
  };

  const handleSelectedIds = (selectedIds) => {
    setSelectedIds(selectedIds)
  };

  // Handle selling a stock item
  const handleSell = (stock) => {
    setSelectedStock(stock) // Set the selected stock
    onSellModalOpen() // Open the SellStock modal
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStockByBarcode()
      console.table(response.data)
      return setOptionItems(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between h-5 ">
        <div className="text-xl font-bold flex items-center">
          <span>Sale</span>
          <div className={`ml-2 ${selectedIds.length == '0' ? 'invisible' : 'visible'}`}>
            - {selectedIds.length} Items
          </div>
        </div>
        <Button className="bg-transparent border border-themeBorder" onPress={() => {
        }}>
          <div className="text-left text-themeSecondary text-base font-semibold">Scan</div>
        </Button>
      </div>
      {/*<div className="flex items-center justify-end mt-7 mr-2 cursor-pointer">*/}
      {/*  <div*/}
      {/*    onClick={() => setSearchInputHidden(!searchInputHidden)}*/}
      {/*    className="text-themeSecondary text-xs"*/}
      {/*  >*/}
      {/*    {searchInputHidden ? "Show" : "Hide"}*/}
      {/*  </div>*/}
      {/*</div>*/}
      <div className="input-group mb-5">
        <StockSearch
          optionItems={optionItems}
          selectedItems={handleSelectedIds}
          isHide={searchInputHidden}
        />
      </div>
      {selectedIds.length !== 0 &&
        <div className="print-box overflow-hidden border border-themeBorder p-4 bg-background rounded-lg shadow-md w-full md:w-3/4 md:mx-auto">
          {/* Receipt Header */}
          <div className="text-2xl font-semibold text-center text-slate-300">Mesoft Receipt</div>
          <div className="border-b-1 border-dashed border-gray-400 my-3 mt-5"></div>
          {/* Table Header */}
          <div className="flex items-center justify-between text-slate-100 pb-2">
            <div className="w-1/3 text-sm font-semibold">Item</div>
            <div className="w-1/4 text-sm text-center">Qty</div>
            <div className="w-1/4 text-sm font-semibold text-left">Unit Price</div>
            <div className="w-1/4 text-sm font-semibold text-right">Amount</div>
          </div>
          <div className="border-b-1 border-dashed border-gray-400"></div>
          {/* Items List */}
          {optionItems.map((item, index) => (
            selectedIds.includes(item.id) && ( // Conditional rendering
              <div
                key={index}
                onClick={() => handleSell(item)}
                className="py-3 md:py-6 border-b border-b-gray-500 cursor-pointer"
              >
                <div className="flex items-center justify-between text-slate-300">
                  <div className="w-1/3 text-sm text-wrap">{item.name}</div>
                  <div className="w-1/4 text-sm text-center">1</div>
                  <div className="w-1/4 text-sm text-left font-medium">{Number(item.sell_amount).toLocaleString()}</div>
                  <div className="w-1/4 text-sm text-right font-medium">{Number(item.sell_amount)}</div>
                </div>
              </div>
            )
          ))}
          {/* Total Section */}
          <div className="mt-4 text-right">
            <span className="text-medium font-bold text-slate-300">Total: 3,400,000 MMK</span>
          </div>
          <Button
            disabled={loading}
            size="sm"
            type="submit"
            className="bg-themeSecondary float-end mt-10 mb-3"
            radius="full"
          >
            {loading ? <Spinner size="sm" color="white"/> : "Check Out" }
          </Button>
        </div>
      }

      {/*<button onClick={() => setIsScanning(!isScanning)}>*/}
      {/*  {isScanning ? 'Stop Scanning' : 'Start Scanning'}*/}
      {/*</button>*/}

      {/*{isScanning && (*/}
      {/*  <BarcodeScannerComponent*/}
      {/*    width={500}*/}
      {/*    height={500}*/}
      {/*    onUpdate={handleScan}*/}
      {/*    onError={handleError}*/}
      {/*  />*/}
      {/*)}*/}
      {/*{scannedData && <p>Scanned Barcode: {scannedData}</p>}*/}
      {/*{cameraError && <p>{cameraError}</p>}*/}
      {/*{product && (*/}
      {/*  <div>*/}
      {/*    <h3>Product Information</h3>*/}
      {/*    <p>Name: {product.name}</p>*/}
      {/*    /!*<p>Price: {product.price}</p>*!/*/}
      {/*    /!*<p>Stock: {product.stock}</p>*!/*/}
      {/*  </div>*/}
      {/*)}*/}
      {/* SellStock Modal */}
      <SellStock isOpen={isSellModalOpen} onOpenChange={onSellModalOpenChange} stock={selectedStock}/>
    </>
  )
}

export default Sell
