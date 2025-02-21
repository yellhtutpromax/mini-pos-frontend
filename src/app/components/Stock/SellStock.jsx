'use client'
import { Modal, ModalBody, ModalContent } from "@heroui/modal"
import { Button } from "@nextui-org/react"
import {useEffect, useState} from "react"
import { ThemeInput } from "@/app/components/Form/Input/ThemeInput"
import {fetchStocksData, saveSale} from "@/app/(admin)/inventory/action" // Import the server action for saving sales
import {useAuth} from "@/app/lib/authContext"
import {Textarea} from "@nextui-org/input"


const SellStock = ({ isOpen, onOpenChange, stock, setMutantObject, mutantObject }) => {

  const { authUser, loading } = useAuth()
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')  // Add state for notes

  const handleSell = async (e) => {
    e.preventDefault()
    try {
      // Validate quantity
      if (quantity < 1 || quantity > stock.quantity) {
        setError("Invalid quantity. Please enter a value between 1 and the available quantity.")
        return
      }

      // Calculate total amount
      const unitPrice = stock.sell_amount // Assuming `sell_amount` is the unit price
      const totalAmount = unitPrice * quantity

      // Update the mutantObject state
      setMutantObject((prevState) => {
        return prevState.map((obj) =>
          obj.id === stock.id ? { ...obj, quantity: quantity, amount: totalAmount } : obj
        )
      })

      return

      // Prepare the sale data
      const saleData = {
        stock_id: stock.id, // ID of the stock being sold
        user_id: authUser.id, // Replace with the actual user ID (e.g., from authentication)
        unit_price: unitPrice,
        total_amount: totalAmount,
        quantity: quantity,
        sell_date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        notes: notes,  // Include notes in sale data
      }

      // Save the sale to the database
      const result = await saveSale(saleData)

      if (result.success) {
        console.log(`Sale successful: ${quantity} of ${stock.name} sold.`)
        onOpenChange(false) // Close the modal after selling
        stock.quantity = stock.quantity - quantity
      } else {
        console.log("Failed to save sale:", result.message)
        setError("Invalid quantity. Please enter a value between 1 and the available quantity.")
      }
    } catch (error) {
      console.log("Error during sale:", error)
      alert("An error occurred. Please try again.")
    }
  }

  useEffect(() => {
    console.log('----------')
    console.log('sell stock is running')
    // console.table(mutantObject)
  }, [])

  return (
    <Modal backdrop="blur" placement="center" className="bg-background" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSell}>
              <div className="ml-3 pt-5 text-white text-sm">Sell Item</div>
              <div className="border border-themeBorder my-2"></div>
              <ModalBody className="p-2">
                <div className="flex justify-items-start items-center">
                  <div className="text-gray-400 text-sm ml-1 mr-10">You are selling:</div>
                  <div className="text-sm text-white ml-5"> {stock.name}</div>
                </div>
                <div className="flex justify-items-start items-center">
                  <div className="text-gray-400 text-sm ml-1 mr-10">Available Quantity: </div>
                  <div className="text-sm text-white"> {stock.quantity} Pcs</div>
                </div>
                <div className="input-group mb-1">
                  <ThemeInput
                    label="Quantity"
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    // value={currentQuantity}
                    // value={
                    //   mutantObject.find((obj) => obj.id === stock.id)?.quantity || 1
                    // }
                    min={1}
                    max={stock.quantity}
                    onChange={(e) => {
                      let value = e.target.value
                      // Prevent entering negative values or non-numeric input
                      if (!/^\d*$/.test(value)) return
                      // Convert the value to a number
                      const parsedValue = value === "" ? "" : Math.max(1, Math.min(stock.quantity, parseInt(value, 10)))
                      // Update state
                      setQuantity(parsedValue)
                    }}
                    required={true}
                  />
                  {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
                </div>
                <div onClick={() => setShowNotes(!showNotes)} className="text-themeSecondary my-1 ml-2 text-sm">Add Notes {showNotes}</div>
                <div className={`input-group mb-1 ${showNotes ? '' : 'hidden'}`}>
                  <Textarea
                    name="notes"
                    isClearable
                    className="w-full border-none"
                    value={notes}  // Bind notes state
                    placeholder="Notes"
                    variant="bordered"
                    onClear={() => console.log("textarea cleared")}
                    onChange={(e) => setNotes(e.target.value)}  // Update notes state
                  />
                </div>
              </ModalBody>
              <div className="border border-themeBorder my-2"></div>
              <div className="flex justify-end space-x-2 p-3">
                <Button className="border-danger-900 text-danger" onPress={onClose}>Close</Button>
                <Button type="submit" className="bg-themeSecondary text-white">Sell</Button>
              </div>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default SellStock
