'use client'
import React, { useEffect } from 'react'
import { Progress, Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react"
import getProfileData from "@/app/(admin)/dashboard/actions"
import { ThemeInput } from "@/app/components/Form/Input/ThemeInput"
import { Image } from "@nextui-org/image"

const Dashboard = () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfileData()
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    fetchProfile()
    console.log('dashboard')
  }, [])

  const cards = [
    { id: 1, title: "Stocks Items", unit: 'Pcs', amount: 1530, },
    { id: 2, title: "Today's Order", unit: 'Pcs', amount: 25000,},
    { id: 3, title: "Capital", unit: 'MMK', amount: '30,000,000,000', layout: 'col-span-2'},
    { id: 4, title: "Profit", unit: 'MMK', amount: '15,000,000', layout: 'col-span-2'},
    { id: 5, title: "Today's Order", unit: 'MMK', amount: '85,000,000', layout: 'col-span-2'},
  ]

  return (
    <>
      <div className="flex items-center justify-between h-5 mb-3">
        <div className="text-xl font-bold flex items-center">
          <span>Dashboard</span>
        </div>
        <Button className="bg-transparent border border-themeBorder">
          <div className="text-left text-themeSecondary text-base font-semibold">Filter</div>
        </Button>
      </div>
      <div className="flex mt-10 mb-3">
        <div className={`ml-1`}>Oct - 2025</div>
        <div className={`ml-1 text-gray-400`}>Audit</div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-wrap">
        {cards.map((card) => (
          <Card
            key={card.id}
            className={`min-h-20 bg-background border border-themeBorder ${card.layout || 'col-span-1'}`}
          >
            <div className="p-4  items-center justify-between">
              <div className="text-base text-themeSecondary">{card.title}</div>
              <div className="flex items-baseline justify-start mt-5">
                <div className="text-3xl text-white">{card.amount}</div>
                <div className="text-sm text-white">&nbsp; {card.unit}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Dashboard
