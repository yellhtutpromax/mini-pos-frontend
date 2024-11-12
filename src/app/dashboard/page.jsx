import React from 'react';
import { verifySession } from '@/app/lib/dal'

const Dashboard = async (props) => {
  const session = await verifySession()
  return (
    <>
    </>
  )
}

export default Dashboard
