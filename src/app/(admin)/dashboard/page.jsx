'use client'
import React, {useEffect} from 'react'
import {Progress, Button, Card, CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";
import getProfileData from "@/app/(admin)/dashboard/actions"
import {ThemeInput} from "@/app/components/Form/Input/ThemeInput";
import {Image} from "@nextui-org/image";

// export const metadata = {
//   title: 'Dashboard ',
//   description: 'Welcome to your dashboard, where you can manage your application.',
// }

const Dashboard =  () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfileData()
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    fetchProfile()
  }, [])
  console.log('Dashboard')
  const cards = [
    { id: 1, title: "Total Revenue", month: 'October', amount: '800,000' },
    { id: 2, title: "Active Members", month: 'October', amount: '30,000' },
    { id: 3, title: "New Members", month: 'October', amount: '6000' },
    { id: 4, title: "Cancelled Members", month: 'October', amount: '2000' },
  ];

  return (
    <>
      <div className="flex items-center justify-between h-10 mb-5">
        <div className="text-xl font-bold">Dashboard</div>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="min-h-36 bg-background border border-themeBorder "
          >
            <div className="p-5 flex-col items-center justify-between">
              <div className="text-lg text-themeSecondary font-semibold">{card.title}</div>
              <div className="text-sm text-white font-medium">{card.month}</div>
              <div className="text-3xl text-white font-bold mt-5">{card.amount}</div>
            </div>
          </Card>
        ))}
        {/*<Card className="w-11/12 md:w-5/12 bg-background border border-themeBorder">*/}
        {/*  <CardHeader className="p-4">*/}
        {/*    <div className="text-white text-xl">Create User</div>*/}
        {/*  </CardHeader>*/}
        {/*  <div className="border border-themeBorder"></div>*/}
        {/*  <CardBody className="p-8">*/}
        {/*    <div className="input-group mb-5">*/}
        {/*      <ThemeInput*/}
        {/*        label="Name"*/}
        {/*        required={false}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div className="input-group mb-5">*/}
        {/*      <ThemeInput*/}
        {/*        label="Email"*/}
        {/*        type="email"*/}
        {/*        required={false}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </CardBody>*/}
        {/*  <div className="border border-themeBorder"></div>*/}
        {/*  <CardFooter className="p-4 flex justify-end items-center">*/}
        {/*    <Button className="bg-[#242745] btn-sm" radius="full">Cancel</Button>*/}
        {/*    <Button className="bg-themeSecondary btn-sm ml-5" radius="full">Create</Button>*/}
        {/*  </CardFooter>*/}
        {/*  <Progress isIndeterminate className="bg-black" size="sm" />*/}
        {/*</Card>*/}
      </div>
    </>
  )
}

export default Dashboard
