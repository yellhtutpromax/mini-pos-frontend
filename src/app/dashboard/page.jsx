import React from 'react';
import { verifySession } from '@/app/lib/dal'

const Dashboard = async (props) => {
  const session = await verifySession()
  console.table(session)
  // const userRole = session.role
  return (
    <>
      <h1>This is dashboard page ... </h1>
    </>
  )
}

export default Dashboard
