'use client'
import React, {useEffect} from 'react'
import {Progress, Button, Card, CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";
import getProfileData from "@/app/(admin)/dashboard/actions"
import {ThemeInput} from "@/app/components/Form/Input/ThemeInput";

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
  return (
    <div className="flex items-center justify-center bg-foreground mt-20 no">
      <Card className="w-1/4 bg-background ">
        <CardHeader className="p-4">
          <div className="text-white text-xl">Create User</div>
        </CardHeader>
        <Divider/>
        <CardBody className="p-8">
          <div className="input-group mb-5">
            <ThemeInput
              label="Name"
              required={false}
            />
          </div>
          <div className="input-group mb-5">
            <ThemeInput
              label="Email"
              type="email"
              required={false}
            />
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="p-4 flex justify-end items-center">
          <Button className="bg-[#242745] btn-sm" radius="full">Cancel</Button>
          <Button className="bg-themeSecondary btn-sm ml-5" radius="full">Create</Button>
        </CardFooter>
        <Progress isIndeterminate className="" size="sm" />
      </Card>
    </div>
  )
}

export default Dashboard
