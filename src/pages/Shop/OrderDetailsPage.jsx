import React from 'react'
import UserOrderDetails from "../components/UserOrderDetails";
import Header from '../../components/Layouts/Header';
import Footer from '../../components/Layouts/Footer';
const OrderDetailsPage = () => {
  return (
    <div>
        <Header />
        <UserOrderDetails />
        <Footer />
    </div>
  )
}

export default OrderDetailsPage