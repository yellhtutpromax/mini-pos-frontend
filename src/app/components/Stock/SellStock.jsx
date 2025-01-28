'use client';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { ThemeInput } from "@/app/components/Form/Input/ThemeInput";
import {saveSale} from "@/app/(admin)/inventory/action" // Import the server action for saving sales

const SellStock = ({ isOpen, onOpenChange, stock }) => {
  const [quantity, setQuantity] = useState(1);

  const handleSell = async () => {
    try {
      // Validate quantity
      if (quantity < 1 || quantity > stock.quantity) {
        alert("Invalid quantity. Please enter a value between 1 and the available quantity.");
        return;
      }

      // Calculate total amount
      const unitPrice = stock.sell_amount; // Assuming `sell_amount` is the unit price
      const totalAmount = unitPrice * quantity;

      // Prepare the sale data
      const saleData = {
        stock_id: stock.id, // ID of the stock being sold
        user_id: 1, // Replace with the actual user ID (e.g., from authentication)
        unit_price: unitPrice,
        total_amount: totalAmount,
        quantity: quantity,
        sell_date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      };

      // Save the sale to the database
      const result = await saveSale(saleData);

      if (result.success) {
        console.log(`Sale successful: ${quantity} of ${stock.name} sold.`);
        onOpenChange(false); // Close the modal after selling
      } else {
        console.error("Failed to save sale:", result.message);
        alert("Failed to save sale. Please try again.");
      }
    } catch (error) {
      console.error("Error during sale:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Modal backdrop="blur" placement="center" className="bg-background" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <div className="ml-3 pt-5 text-white text-sm">Sell Item</div>
            <div className="border border-themeBorder my-2"></div>
            <ModalBody className="p-2">
              <div className="font-bold text-sm ml-2">You are selling: <strong>{stock.name}</strong></div>
              <div className="font-bold text-sm ml-2">Available Quantity: <strong>{stock.quantity} Pcs</strong></div>
              <div className="input-group mb-1">
                <ThemeInput
                  label="Quantity"
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={quantity}
                  min="1"
                  max={stock.quantity}
                  onChange={(e) => {
                    const value = e.target.value;
                    const parsedValue = parseInt(value, 10); // Parse as base-10 integer
                    setQuantity(isNaN(parsedValue) ? 1 : parsedValue); // Fallback to 1 if NaN
                  }}
                  required={true}
                />
              </div>
            </ModalBody>
            <div className="border border-themeBorder my-2"></div>
            <div className="flex justify-end space-x-2 p-3">
              <Button className="border-danger-900 text-danger" onPress={onClose}>Close</Button>
              <Button color="primary" onPress={handleSell}>Sell</Button>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SellStock;