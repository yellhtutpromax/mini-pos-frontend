import React from 'react';
import {decrypt} from "@/app/lib/session";
import { cookies } from 'next/headers'
import {getAuthUser} from "@/app/hooks/auth";

export const metadata = {
  title: 'Dashboard ',
  description: 'Welcome to your dashboard, where you can manage your application.',
}

const Dashboard = async (props) => {
  return (
    <div className="bg-background">

    </div>
  )
}

export default Dashboard
