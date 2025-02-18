'use client'

import {useEffect, useState} from "react"
import {ThemeInput} from "@/app/components/Form/Input/ThemeInput"
import StockBlock from "@/app/components/Stock/StockBlock"
import {fetchSaleData} from "@/app/(admin)/sell/history/action"
import SellBlock from "@/app/components/Sell/SellBlock";

const Sell = () => {
  const [sales, setSalesData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const data = await fetchSaleData()
      setSalesData(data.data)
      setLoading(false) // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching stock data:", error)
      setLoading(false) // Set loading to false even if there's an error
    }
  }

  useEffect(() => {
    fetchData() // Call the fetchData function directly
  }, []) // Empty dependency array ensures this runs only once on mount

  console.log(sales) // This will log the sales data after it's fetched

  return (
    <>
      <div className="flex items-center justify-between h-10 mb-3">
        <div className="text-xl font-bold flex items-center">
          <span>Sell</span>
        </div>
        {/*<Button className="bg-transparent border border-themeBorder">*/}
        {/*  <div className="text-left text-themeSecondary text-base font-semibold">Entry</div>*/}
        {/*</Button>*/}
      </div>
      <div className="load-card-ui">
        <div className="mt-4 " style={{overflowY: 'scroll', maxHeight: '750px', scrollbarWidth: 'none'}}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sales.map((sale) => (
              <SellBlock
                key={sale.id}
                sale={sale}
                loading={loading}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sell
