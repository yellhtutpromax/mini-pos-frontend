"use client"

import React, {useEffect, useState} from 'react'
import dynamic from 'next/dynamic'
import {fetchStockByBarcode} from "@/app/(admin)/sale/action"
import StockSearch from "@/app/components/Sale/StockSearch";
import {Button} from "@nextui-org/react";


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

  // useEffect(() => {
  //   getStockByBarcode()
  // })

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStockByBarcode()
      return setOptionItems(response.data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex items-center justify-between h-5 ">
        <div className="text-xl font-bold flex items-center">
          <span>Inventory</span>
          {/*<div className={`ml-2 ${totalStock === 0 ? 'invisible' : 'visible'}`}>( {totalStock} Items )</div>*/}
        </div>
        <Button className="bg-transparent border border-themeBorder" onPress={() => {
        }}>
          <div className="text-left text-themeSecondary text-base font-semibold">Scan</div>
        </Button>
      </div>
      <div className="input-group mb-5 mt-10">
        <StockSearch optionItems={optionItems} />
      </div>
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
    </>
  )
}

export default Sell
