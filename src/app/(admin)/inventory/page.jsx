'use client';
import {useEffect, useState} from "react";
import { Alert } from "@heroui/alert";
import {Button, Card, CardBody, CardFooter, CardHeader, Spinner} from "@nextui-org/react";
import { Modal,  ModalContent,  ModalHeader,  ModalBody,  ModalFooter, ModalProps, useDisclosure} from "@heroui/modal";
import { ThemeInput } from "@/app/components/Form/Input/ThemeInput";
import {fetchStocksData, saveFormData} from "@/app/(admin)/inventory/action"
import StockBlock from "@/app/components/StockBlock";

const Inventory = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "Box 2 Inches",
    buyAmount: "2000",
    sellAmount: "4000",
    quantity: "30",
  });

  // State for validation errors
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({});

  // State for fetched stock data
  const [totalStock, setTotalStock] = useState(0);
  const [stocks, setStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  // Fetch stock data on component mount
  const fetchStock = async () => {
    try {
      const data = await fetchStocksData();
      console.table(data.data);
      setTotalStock(data.data.length)
      setStocks(data.data); // Set the fetched stock data in state
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Form submitted successfully:", formData);
    try {
      setLoading(true)
      const response = await saveFormData(formData); // Call the save function
      if (response.success) {
        await fetchStock();
        // Optionally, reset the form or show a success message
        setFormData({ name: "", buyAmount: "", sellAmount: "", quantity: "" });
        // Close the modal
        onOpenChange(false);
      } else {
        console.log("Error saving data:", response.message);
      }
      setLoading(false)
    } catch (error) {
      console.log("Unexpected error occurred:", error);
      setLoading(false)
    }
  };

  // Filter stocks based on search query
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (stock.barcode && stock.barcode.toLowerCase().includes(searchQuery.toLowerCase())) ||
    stock.buy_amount.toString().includes(searchQuery) ||
    stock.sell_amount.toString().includes(searchQuery)
  );

  useEffect(() => {
    fetchStock(); // Fetch stock data when the component mounts
  }, []);

  useEffect(() => {
    setTotalStock(filteredStocks.length)
  }, [filteredStocks]);


  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    console.log(filteredStocks)
    // setFormData((prev) => ({
    //  ...prev,
    //   name: value,
    // }));
  }

  return (
    <>
      <div className="flex items-center justify-between h-10 mb-3">
        <div className="text-xl font-bold flex items-center">
          <span>Inventory</span>
          <div className={`ml-2 ${totalStock === 0 ? 'invisible' : 'visible'}`}>( {totalStock} Items )</div>
        </div>
        <Button className="bg-transparent border border-themeBorder" onPress={onOpen}>
          <div className="text-left text-themeSecondary text-base font-semibold">Entry</div>
        </Button>
      </div>
      <div className="input-group mb-5">
        <ThemeInput
          label={false}
          value={formData.name}
          type="text"
          name="search"
          placeholder="Type to search ..."
          className="border-none focus:border-themeBorder"
          autoComplete="off"
          autoFocus={true}
          value={searchQuery}
          onChange={handleSearch}
          required={false}
        />
        {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
      </div>
      <div className="mt-4 " style={{overflowY: 'scroll',maxHeight: '700px', scrollbarWidth: 'none' }} >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStocks.map((stock) => (
            <StockBlock key={stock.id} stock={stock} />
          ))}
        </div>
      </div>

      <Modal className="bg-background rounded" isOpen={isOpen} scrollBehavior={"inside"} onOpenChange={onOpenChange}>
        <ModalContent className="bg-background rounded">
          {(onClose) => (
            <>
              <div className="bg-background">
                <div className="ml-3 pt-5 text-white text-sm">Stock Entry</div>
                <ModalBody className="p-2">
                  <form onSubmit={handleSubmit}>
                    {/*<div className="border border-themeBorder"></div>*/}
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
                      {/*<div className="border border-themeBorder"></div>*/}
                      <div className="p-2 mt-3 flex justify-end items-center">
                        <Button
                          size={'sm'}
                          type="button"
                          radius="full"
                          onClick={() => {
                            setFormData({name: "", buyAmount: "", sellAmount: "", quantity: ""});
                            setErrors({});
                          }}
                          className="bg-[#242745]"
                        >
                          Clear
                        </Button>
                        <Button
                          disabled={loading}
                          size={'sm'}
                          type="submit"
                          className="bg-themeSecondary ml-5"
                          radius="full">
                          {loading ? <Spinner size={'sm'} color={'white'}/> : "Save"}
                        </Button>
                      </div>
                    </form>
                  </ModalBody>
                </div>
              </>
            )}
          </ModalContent>
        </Modal>

      </>
      );
      };

      export default Inventory;
