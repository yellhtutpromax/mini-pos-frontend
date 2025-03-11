"use client"

import React, {useEffect, useMemo, useRef, useState} from 'react'
import { BrowserMultiFormatReader } from "@zxing/library"
import {fetchStockByBarcode, saveReceipt} from "@/app/(admin)/sale/action"
import {paymentMethods} from "@/app/constants/constants"
import SellStock from "@/app/components/Stock/SellStock"
import StockSearch from "@/app/components/Sale/StockSearch"
import {useAuth} from "@/app/lib/authContext"
import {Button, Spinner} from "@nextui-org/react"
import {useDisclosure} from "@heroui/modal"
import {addToast, Select, SelectItem, Tabs, Tab} from "@heroui/react"
import {ThemeInput} from "@/app/components/Form/Input/ThemeInput"
import PrintSheet from "@/app/components/Sale/PrintSheet"

const Sell = () => {

  const { authUser } = useAuth()
  const [optionItems, setOptionItems] = useState([])
  const [searchInputHidden, setSearchInputHidden] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]?.id.toString())
  const [totalPrice, setTotalPrice] = useState(0)
  const [isDiscount, setIsDiscount] = useState(false)
  const [discountAmount, setDiscountAmount] = useState(0)
  const [depositAmount, setDeposit] = useState(0)
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedStock, setSelectedStock] = useState(null)
  // const [quantities, setQuantities] = useState({})
  const [loading, setLoading] = useState(false)

  const {isOpen: isSellModalOpen, onOpen: onSellModalOpen, onOpenChange: onSellModalOpenChange} = useDisclosure()

  const [mutantObject, setMutantObject] = useState([])
  const handleSelectedIds = (selectedIds) => {
    setSelectedIds(selectedIds)
    // console.log('Selected IDs:', selectedIds)
    // console.log(mutantObject)
    // Create a new object based on the previous state
    setMutantObject((prevState) => [
      ...selectedIds.map((id) => {
        const selectedItem = optionItems.find((item) => item.id === id)
        const selectedAmount = selectedItem && selectedItem.sell_amount // Get the name or a fallback value
        const existingObj = prevState.find((obj) => obj.id === id)
        return existingObj ? existingObj : { id, quantity: 1, amount: Number(selectedAmount) }
      }),
    ])
  }

  // Handle selling a stock item
  const handleSell = (stock) => {
    setSelectedStock(stock) // Set the selected stock
    onSellModalOpen() // Open the SellStock modal
  }

  const handleSubmit = async () => {
    setLoading(true)
    const formData =  {
      userId: authUser.id,
      mutantObject,
      selectedIds,
      depositAmount: Number(depositAmount),
      discountAmount: Number(discountAmount),
      totalPrice,
      paymentMethod: Number(paymentMethod),
    } // payload
    console.clear()
    // console.table(formData)
    const response = await saveReceipt(formData)
    if (response.success) {
      setLoading(false)
      // addToast({
      //   title: "Saved",
      //   description: response.message,
      //   color: "success",
      //   timeout: 2000
      // })
      console.log(response)
      // Reset the form state
      setMutantObject([])
      setSelectedIds([])
      setDeposit(0)
      setDiscountAmount(0)
      setTotalPrice(0)
      // onSellModalOpenChange(false) // Close the SellStock modal
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStockByBarcode()
      // console.table(response.data)
      return setOptionItems(response.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    // Ensure amounts are numbers before summing
    const netAmount = mutantObject.reduce((sum, item) => sum + (Number(item.amount) || 0), 0)
    setTotalPrice(netAmount)
    console.clear()
    console.table(mutantObject)
    console.log("Total Amount : ", totalPrice)
    console.log('*******************')
  }, [mutantObject])

  const finalTotal = useMemo(() => Number(totalPrice) - Number(discountAmount), [totalPrice, discountAmount])

  const [barcodeResult, setBarcodeResult] = useState("")
  const [isDeviceFound, setIsDeviceFound] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  const scanTheBarcode = async () => {
    const codeReader = new BrowserMultiFormatReader()
    codeReader.reset();
    setIsScanning(true) // Start scanning
    try {
      // List available video devices
      const videoInputDevices = await codeReader.listVideoInputDevices()

      if (videoInputDevices.length > 0) {
        setIsDeviceFound(true) // Device found
        const result = await codeReader.decodeFromInputVideoDevice(undefined, "video")
          .catch((err) => {
            console.error("Error decoding barcode:", err);
            return null;
          });

        if (result) {
          setBarcodeResult(result.text);
          console.log("Scanned barcode:", result);
        } else {
          console.log("No barcode detected.");
        }
      } else {
        setIsDeviceFound(false) // No device found
        setBarcodeResult("No camera device found.")
        console.log("No camera device found.")
      }
    } catch (err) {
      console.error("Error scanning barcode:", err)
      setBarcodeResult("Error scanning barcode.")
      console.log('Error scanning')
    }
  }

  const scanStop = () => {
    const videoElement = document.getElementById("video");

    if (videoElement && videoElement.srcObject) {
      const stream = videoElement.srcObject;
      const tracks = stream.getTracks(); // Get all tracks (video & audio)

      tracks.forEach(track => track.stop()); // Stop each track
      videoElement.srcObject = null; // Remove the video source
    }

    const codeReader = new BrowserMultiFormatReader()
    codeReader.reset() // Reset the scanner
    setIsScanning(false) // Stop scanning
    setBarcodeResult("") // Reset barcode result
  }

  return (
    <>
      <div className="flex items-center justify-between h-5 ">
        <div className="text-xl font-bold flex items-center">
          <span>Sale</span>
          <div className={`ml-2 ${selectedIds.length == '0' ? 'invisible' : 'visible'}`}>
            - {selectedIds.length} Items
          </div>
        </div>
        <div className={`${selectedIds.length == '0' ? 'invisible' : 'visible'} flex items-center justify-center cursor-pointer`}>
          <div
            onClick={() => setSearchInputHidden(!searchInputHidden)}
            className="text-themeSecondary text-xs"
          >
            {searchInputHidden ? "Show" : "Hide"}
          </div>
        </div>
        <Button className="bg-transparent border border-themeBorder" onPress={!isScanning ? scanTheBarcode : scanStop}>
          <div className="text-left text-themeSecondary text-base font-semibold"> {!isScanning ? "Scan" : "Stop"}</div>
        </Button>
      </div>
      <div className={`${!isScanning? 'hidden':'visible'} flex flex-col items-center justify-between mt-6`}>
        <div>
          <video id="video" className="w-screen h-1/3 object-cover rounded-2xl" />
        </div>
        <div>
          {isDeviceFound ? (
            <div className="mt-3 text-gray-500">Barcode : {barcodeResult || " Scanning..."}</div>
          ) : (
            <div>Not Found: {barcodeResult}</div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
            cursor: "w-full bg-themeSecondary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-themeSecondary",
          }}
          color="primary"
          variant="underlined"
        >
          <Tab
            key="checkout"
            className={"p-0"}
            title={
              <div className="flex items-center space-x-2">
                <span>Check Out</span>
              </div>
            }
          >
            <div className="input-group mb-5">
              <StockSearch
                optionItems={optionItems}
                mutantObject={mutantObject}
                selectedItems={handleSelectedIds}
                isHide={searchInputHidden}
              />
            </div>
            {selectedIds.length !== 0 &&
              <div className="w-full md:w-3/4 md:mx-auto print-box overflow-hidden border border-themeBorder p-2 bg-background rounded-lg shadow-md mb-16">
                <form action={handleSubmit}>
                  {/* Receipt Header */}
                  <div className="text-2xl mt-2 text-center text-slate-300">Receipt</div>
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
                  {optionItems.map((item, index) => {
                    const quantity = mutantObject.find((obj) => obj.id === item.id)?.quantity || 1
                    return (
                      selectedIds.includes(item.id) && ( // Conditional rendering
                        <div
                          key={index}
                          onClick={() => handleSell(item)}
                          className="py-3 md:py-6 border-b border-b-gray-500 cursor-pointer"
                        >
                          <div className="flex items-center justify-between text-slate-300">
                            <div className="w-1/3 text-sm text-wrap">{item.name}</div>
                            <div className="w-1/4 text-sm text-center">{quantity}</div>
                            <div className="w-1/4 text-sm text-left font-medium">
                              {Number(item.sell_amount).toLocaleString()}
                            </div>
                            <div className="w-1/4 text-sm text-right font-medium">{Number(item.sell_amount) * quantity }</div>
                          </div>
                        </div>
                      )
                    )
                  })}

                  {/* Net Total Section */}
                  <div className={`text-right mt-5 text-sm text-slate-400`}>Net Total: {Number(totalPrice).toLocaleString()} MMK</div>

                  <div className="flex gap-3 justify-between items-center  mb-5 ">
                    <div className="w-1/2">
                      <Select
                        classNames={{
                          base: "w-full mt-4",
                          trigger: "border border-themeBorder",
                        }}
                        label={false}
                        aria-label={"Payment Method"}
                        // placeholder="Payment Method"
                        selectedKeys={[paymentMethod]} // Auto-select the first item
                        variant="bordered"
                        onSelectionChange={(keys) => setPaymentMethod([...keys][0])} // Extract selected key
                      >
                        {paymentMethods.map((payment) => (
                          <SelectItem key={payment.id} value={payment.id.toString()} >{payment.name}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    <div className={`w-1/2 mt-3 input-group`}>
                      <ThemeInput
                        customClassName={``}
                        label={false}
                        type="number"
                        id="deposit"
                        name="deposit"
                        placeholder="Deposit"
                        min={1}
                        value={depositAmount}
                        onChange={(e) => setDeposit(e.target.value)}
                      />
                      {/*{error && <div className="text-red-500 text-sm mt-1">{error}</div>}*/}
                    </div>
                  </div>
                  <div className="border-b-1 border-gray-600"></div>
                  <div className="flex items-center justify-between mt-3">
                    <div
                      className="text-themeSecondary text-sm cursor-pointer"
                      onClick={() => {
                        setIsDiscount(!isDiscount)
                        setDiscountAmount(0)
                      }}
                    >
                      {isDiscount ? <p className="text-danger ml-1">Remove</p> : "Discount"}
                    </div>
                    <div className={`${isDiscount ? "visible": "invisible"} text-right text-sm text-warning-500`}>Discount: {Number(discountAmount).toLocaleString()} MMK</div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className={`w-1/2 mt-3 input-group ${isDiscount ? "visible": "invisible"} `}>
                      <ThemeInput
                        label={false}
                        type="number"
                        id="discount"
                        name="discount"
                        placeholder="Discount"
                        min={1}
                        value={discountAmount}
                        onChange={(e) => setDiscountAmount(e.target.value)}
                        // max={stock.quantity}
                        // onChange={(e) => {}}
                      />
                      {/*{error && <div className="text-red-500 text-sm mt-1">{error}</div>}*/}
                    </div>
                    <div className="w-1/2 mt-4 text-right">
                      <span className="text-right text-medium font-bold text-slate-300">Total: { finalTotal.toLocaleString() } MMK</span>
                    </div>
                  </div>
                  <div className="border-b border-b-gray-700 mt-7"></div>
                  <Button
                    disabled={loading}
                    size="sm"
                    type="submit"
                    className="bg-themeSecondary float-end mt-5 mb-2"
                    radius="full"
                  >
                    {loading ? <Spinner size="sm" color="white"/> : "Check Out" }
                  </Button>
                </form>
              </div>
            }
          </Tab>
          <Tab
            key="print"
            title={
              <div className="flex items-center space-x-2">
                <span>Print</span>
                {/*<Chip size="sm" variant="faded">1</Chip>*/}
              </div>
            }
          >
            <PrintSheet/>
          </Tab>
        </Tabs>
      </div>
      {/* SellStock Modal */}
      <SellStock
        isOpen={isSellModalOpen}
        onOpenChange={onSellModalOpenChange}
        handleSelectedIds={handleSelectedIds}
        stock={selectedStock}
        setMutantObject={setMutantObject}
        mutantObject={mutantObject}
      />
    </>
  )
}

export default Sell
