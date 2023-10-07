import React, { useEffect, useState } from 'react'
import Header from '../components/Layouts/Header'
import Footer from '../components/Layouts/Footer'
import styles from '../styles/styles'
import ProductCard from '../components/ProductCard/ProductCard'
import { useSelector } from 'react-redux'
import { productData } from '../static/data'

const BestSellingPage = () => {
    const [data, setData] = useState([]);
    //const {allProducts,isLoading} = useSelector((state) => state.products);
  
    useEffect(() => {
        const d = productData && productData.sort((a,b) => b.total_sell - a.total_sell);
      setData(d);
    }, []);
  return (
    <>
       <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
    </>
  )
}

export default BestSellingPage
