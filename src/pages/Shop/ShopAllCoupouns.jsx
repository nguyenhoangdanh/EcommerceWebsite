import React from 'react'
import styles from '../../styles/styles'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllCoupouns from "../../components/Shop/AllCoupouns.jsx"

const ShopAllCoupounCodes = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex justify-between w-full">
      <div className="w-[330px]">
        <DashboardSideBar active={10} />
      </div>
      <div className='w-full justify-center flex'>
        <AllCoupouns />
      </div>
    </div>
  </div>
  )
}

export default ShopAllCoupounCodes

