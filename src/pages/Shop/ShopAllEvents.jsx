import React from 'react'
import styles from '../../styles/styles'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllEvents from "../../components/Shop/AllEvents"

const ShopAllEvents = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="w-[330px]">
        <DashboardSideBar active={7} />
      </div>
      <div className='w-full justify-center flex'>
        <AllEvents />
      </div>
    </div>
  </div>
  )
}

export default ShopAllEvents

