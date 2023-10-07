import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '../../redux/actions/product';
import { AiOutlineArrowRight, AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import Loader from '../Layouts/Loader';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';
import { getAllOrdersOfShop } from '../../redux/actions/order';

const AllOrders = () => {
    const {products, isLoading} = useSelector((state) => state.products);
    const {orders} = useSelector((state) => state.order);
    const{seller} = useSelector((state) => state.seller);
    const[open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [coupouns,setCoupouns] = useState([]);
    const [minAmount, setMinAmout] = useState(null);
    const [maxAmount, setMaxAmount] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [value, setValue] = useState(null);
    const [name, setName] = useState("");

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
    },[dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
      //  window.location.reload();
      setTimeout(function(){window.location.reload(true);},100)
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
      }

      const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      orders &&
        orders.forEach((item) => {
          row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice,
            status: item.status,
          });
        });
    
  return (
    <>
    {isLoading ? (
      <Loader />
    ) : (
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        {/* <div className='w-full flex justify-end'>
          <div className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
          onClick={() =>setOpen(true)}>
            <span className='text-white'> Create Coupoun Code</span>
          </div>  
        </div> */}
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    )}
  </>
  )
}

export default AllOrders
