'use client'
import React, {useEffect} from 'react'
import getProfileData from "@/app/(admin)/dashboard/actions"
import {ThemeInput} from "@/app/components/Form/Input/Input";
// export const metadata = {
//   title: 'Dashboard ',
//   description: 'Welcome to your dashboard, where you can manage your application.',
// }

const Dashboard =  () => {
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getProfileData()
        console.table(result) // Log the resolved data
      } catch (error) {
        console.error('Error fetching profile data:', error)
      }
    }
    fetchProfile()
  }, [])
  return (
    <div className="bg-background">
      <ThemeInput
      />
    </div>
  )
}

export default Dashboard
