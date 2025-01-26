'use client';
import { useState } from "react";
import { Alert } from "@heroui/alert";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { ThemeInput } from "@/app/components/Form/Input/ThemeInput";
import { saveFormData } from "@/app/(admin)/inventory/action"

const Inventory = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "Box 2 Inches",
    buyAmount: "2000",
    sellAmount: "4000",
    quantity: "30",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Validate form
  const validate = () => {
    let validationErrors = {};
    if (!formData.name) {
      validationErrors.name = "Name is required.";
    }
    if (!formData.buyAmount || isNaN(formData.buyAmount) || parseFloat(formData.buyAmount) <= 0) {
      validationErrors.buyAmount = "Buy Amount must be a valid number greater than 0.";
    }
    if (!formData.sellAmount || isNaN(formData.sellAmount) || parseFloat(formData.sellAmount) <= 0) {
      validationErrors.sellAmount = "Sell Amount must be a valid number greater than 0.";
    }
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      validationErrors.quantity = "Quantity must be a valid number greater than 0.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully:", formData);
      try {
        const response = await saveFormData(formData); // Call the save function
        if (response.success) {
          // Optionally, reset the form or show a success message
          setFormData({ name: "", buyAmount: "", sellAmount: "", quantity: "" });
        } else {
          console.log("Error saving data:", response.message);
        }
      } catch (error) {
        console.log("Unexpected error occurred:", error);
      }
    } else {
      console.log("Form validation errors:", errors);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between h-10 mb-3">
        <div className="text-xl font-bold">Inventory</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <form onSubmit={handleSubmit}>
          <Card className="w-full bg-background border border-themeBorder">
            <CardHeader className="p-3">
              <div className="text-white text-sm">Stock Entry</div>
            </CardHeader>
            <div className="border border-themeBorder"></div>
            <CardBody className="p-2">
              {/*{Object.keys(errors).length > 0 && (*/}
              {/*  <Alert*/}
              {/*    className="mb-4"*/}
              {/*    color="warning"*/}
              {/*    title="Validation Errors"*/}
              {/*    isClosable={true}*/}
              {/*  >*/}
              {/*    <ul>*/}
              {/*      {Object.values(errors).map((error, index) => (*/}
              {/*        <li key={index} className="text-sm text-red-500">{error}</li>*/}
              {/*      ))}*/}
              {/*    </ul>*/}
              {/*  </Alert>*/}
              {/*)}*/}
              <div className="input-group mb-1">
                <ThemeInput
                  label="Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={false}
                />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>
              <div className="input-group mb-1">
                <ThemeInput
                  label="Buy Amount"
                  type="number"
                  name="buyAmount"
                  value={formData.buyAmount}
                  onChange={handleChange}
                  required={true}
                />
                {errors.buyAmount && <div className="text-red-500 text-sm mt-1">{errors.buyAmount}</div>}
              </div>
              <div className="input-group mb-1">
                <ThemeInput
                  label="Sell Amount"
                  type="number"
                  name="sellAmount"
                  value={formData.sellAmount}
                  onChange={handleChange}
                  required={true}
                />
                {errors.sellAmount && <div className="text-red-500 text-sm mt-1">{errors.sellAmount}</div>}
              </div>
              <div className="input-group mb-1">
                <ThemeInput
                  label="Quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required={true}
                />
                {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
              </div>
            </CardBody>
            <div className="border border-themeBorder"></div>
            <CardFooter className="p-2 flex justify-end items-center">
              <Button
                size={'sm'}
                type="button"
                radius="full"
                onClick={() => {
                  setFormData({ name: "", buyAmount: "", sellAmount: "", quantity: "" });
                  setErrors({});
                }}
                className="bg-[#242745]"
              >
                Clear
              </Button>
              <Button
                size={'sm'}
                type="submit"
                className="bg-themeSecondary ml-5"
                radius="full">
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
};

export default Inventory;
