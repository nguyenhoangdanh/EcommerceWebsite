import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllRefundsOrders from '../../components/Shop/AllRefundsOrders'

const ShopAllRefunds = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="w-[330px]">
        <DashboardSideBar active={11} />
      </div>
      <div className='w-full justify-center flex'>
        <AllRefundsOrders />
      </div>
    </div>
  </div>
  )
}

export default ShopAllRefunds
