'use client'
import {useEffect, useState} from "react"
import {Button, Divider, Spinner} from "@nextui-org/react"
import {Modal, ModalContent, ModalBody, useDisclosure} from "@heroui/modal"
import {ThemeInput} from "@/app/components/Form/Input/ThemeInput"
import {fetchStocksData, saveFormData, editFormData} from "@/app/(admin)/inventory/action"
import StockBlock from "@/app/components/Stock/StockBlock"
import SellStock from "@/app/components/Stock/SellStock"
import {useAuth} from "@/app/lib/authContext";

const Inventory = () => {
  const { authUser } = useAuth();
  // State for form inputs
  const [formData, setFormData] = useState({
    user_id: authUser.id,
    name: "",
    buyAmount: "",
    sellAmount: "",
    quantity: "",
    stockPicture: null,
  })

  // State for validation errors
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [fetchLoading, setFetchLoading] = useState(true)

  // State for fetched stock data
  const [totalStock, setTotalStock] = useState(0)
  const [stocks, setStocks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  // Validate form
  const validate = () => {
    let validationErrors = {}
    const { stockPicture } = formData
    if(stockPicture && typeof stockPicture !== "string") {
      // Check if the file is an image
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(stockPicture.type)) {
        validationErrors.stockPicture = "Only image files are allowed."
      }
    }

    if (!formData.name) {
      validationErrors.name = "Name is required."
    }
    if (!formData.buyAmount || isNaN(formData.buyAmount) || parseFloat(formData.buyAmount) <= 0) {
      validationErrors.buyAmount = "Buy Amount must be a valid number greater than 0."
    }
    if (!formData.sellAmount || isNaN(formData.sellAmount) || parseFloat(formData.sellAmount) <= 0) {
      validationErrors.sellAmount = "Sell Amount must be a valid number greater than 0."
    }
    if (!formData.quantity || isNaN(formData.quantity) || parseInt(formData.quantity) <= 0) {
      validationErrors.quantity = "Quantity must be a valid number greater than 0."
    }
    setErrors(validationErrors)
    return Object.keys(validationErrors).length === 0
  }

  // State for SellStock modal
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const {isOpen: isSellModalOpen, onOpen: onSellModalOpen, onOpenChange: onSellModalOpenChange} = useDisclosure()
  const [selectedStock, setSelectedStock] = useState(null)

  // Fetch stock data on component mount
  const fetchStock = async () => {
    try {
      const data = await fetchStocksData()
      // setTimeout(() => {
        setFetchLoading(false) // fetch stock data loading
        setTotalStock(data.data.length)
        setStocks(data.data) // Set the fetched stock data in state
      // },2000)
    } catch (error) {
      console.error("Error fetching stock data:", error)
    }
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      setLoading(true)
      console.table(formData)
      const response = await (isEditing ? editFormData(formData) : saveFormData(formData))
       // Call the api function
      if (response.success) {
        await fetchStock()
        // Optionally, reset the form or show a success message
        setFormData({name: "", buyAmount: "", sellAmount: "", quantity: ""})
        // Close the modal
        onOpenChange(false)
      } else {
        console.log("Error saving data:", response.message)
      }
      setLoading(false)
    } catch (error) {
      console.log("Unexpected error occurred:", error)
      setLoading(false)
    }
  }

  // Filter stocks based on search query
  const filteredStocks = stocks.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (stock.barcode && stock.barcode.toLowerCase().includes(searchQuery.toLowerCase())) ||
    stock.buy_amount.toString().includes(searchQuery) ||
    stock.sell_amount.toString().includes(searchQuery)
  )

  const formClear = () => {
    setFormData({user_id: authUser.id, name: "", buyAmount: "", sellAmount: "", quantity: "", stockPicture: null})
    setIsEditing(false)
    setErrors({})
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchStock(); // Fetch stock data asynchronously
    };

    fetchData(); // Call the async function
  }, [])

  useEffect(() => {
    setTotalStock(filteredStocks.length)
  }, [filteredStocks])


  const handleSearch = (e) => {
    const {value} = e.target
    setSearchQuery(value)
  }

  // Handle editing a stock item
  const handleEdit = (stock) => {
    setErrors({}) // Clear the form data
    setIsEditing(true)
    setFormData({
      id: stock.id, // Set the ID of the stock being edited
      user_id: authUser.id, // Set the user ID
      name: stock.name,
      buyAmount: stock.buy_amount,
      sellAmount: stock.sell_amount,
      quantity: stock.quantity,
      stockPicture: stock.photo
    })
    onOpen() // Open the modal (if needed)
  }

  // Handle selling a stock item
  const handleSell = (stock) => {
    setSelectedStock(stock) // Set the selected stock
    onSellModalOpen() // Open the SellStock modal
  }

  return (
    <>
      <div className="flex items-center justify-between h-5 ">
        <div className="text-xl font-bold flex items-center">
          <span>Inventory</span>
          <div className={`ml-2 ${totalStock === 0 ? 'invisible' : 'visible'}`}>( {totalStock} Items )</div>
        </div>
        <Button className="bg-transparent border border-themeBorder" onPress={() => {
          onOpen()
          formClear()
        }}>
          <div className="text-left text-themeSecondary text-base font-semibold">Entry</div>
        </Button>
      </div>
      <div className="input-group mb-5">
        <ThemeInput
          label={false}
          type="text"
          name="search"
          placeholder="Type to search ..."
          className="border-none focus:border-themeBorder"
          autoComplete="off"
          isClearable={true}
          autoFocus={true}
          value={searchQuery}
          onChange={handleSearch}
          required={false}
        />
      </div>
      <div className="load-card-ui">
        <div className="mt-4" style={{overflowY: 'scroll', maxHeight: '700px', scrollbarWidth: 'none'}}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStocks.map((stock) => (
              <StockBlock
                key={stock.id}
                stock={stock}
                onEdit={handleEdit}
                onSell={handleSell}
                fetchLoading={fetchLoading}
              />
            ))}
          </div>
        </div>
        <Modal className="bg-background rounded" isOpen={isOpen} scrollBehavior={"inside"} onOpenChange={onOpenChange}>
          <ModalContent className="bg-background rounded">
            {(onClose) => (
              <>
                <div className="bg-background">
                  <div className="ml-3  pt-5 text-white text-sm">{isEditing ? 'Edit' : 'Stock Entry'}</div>
                  <Divider className="border-t border-themeBorder mt-4" />
                  <ModalBody className="p-2">
                    <form onSubmit={handleSubmit}>
                      <div className="input-group mb-1">
                        <label className="block text-sm font-medium text-gray-700">Stock Picture</label>
                        <input
                          type="file"
                          name="stockPicture"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFormData({ ...formData, stockPicture: file });
                            }
                          }}
                          className="mt-1 py-1 block w-full text-sm  border border-themeBorder rounded-lg cursor-pointer bg-background focus:outline-none"
                          accept="image/*"
                        />
                        {formData.stockPicture && (
                          <div className="mt-2 text-sm text-gray-500">
                            Current File: {typeof formData.stockPicture === "string" ? formData.stockPicture : formData.stockPicture.name}
                          </div>
                        )}
                        {errors.stockPicture && <div className="text-red-500 text-sm mt-1">{errors.stockPicture}</div>}
                      </div>
                      <div className="input-group mb-1">
                        <ThemeInput
                          label="Name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                          onChange={(e) => setFormData({...formData, buyAmount: e.target.value})}
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
                          onChange={(e) => setFormData({...formData, sellAmount: e.target.value})}
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
                          onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                          required={true}
                        />
                        {errors.quantity && <div className="text-red-500 text-sm mt-1">{errors.quantity}</div>}
                      </div>
                      <div className="p-2 mt-3 flex justify-end items-center">
                        <Button
                          size={'sm'}
                          type="button"
                          radius="full"
                          onPress={formClear}
                          className="bg-[#242745]"
                        >
                          Clear
                        </Button>
                        <Button
                          disabled={loading}
                          size="sm"
                          type="submit"
                          className="bg-themeSecondary ml-5"
                          radius="full"
                        >
                          {loading ? <Spinner size="sm" color="white"/> : isEditing ? "Update" : "Save"}
                        </Button>
                      </div>
                    </form>
                  </ModalBody>
                </div>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* SellStock Modal */}
        <SellStock isOpen={isSellModalOpen} onOpenChange={onSellModalOpenChange} stock={selectedStock}/>
      </div>
    </>
  )
}

export default Inventory
