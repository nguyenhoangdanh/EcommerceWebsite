import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProductsShop } from '../../redux/actions/product';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Button } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import { DataGrid } from '@material-ui/data-grid';
import Loader from '../Layouts/Loader';
import styles from '../../styles/styles';
import { RxCross1 } from 'react-icons/rx';

const AllProducts = () => {
    const {products, isLoading} = useSelector((state) => state.products);
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
        dispatch(getAllProductsShop(seller._id));
    },[dispatch])

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
      //  window.location.reload();
      // setTimeout(function(){window.location.reload(true);},100)
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
      }

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
        {
          field: "name",
          headerName: "Name",
          minWidth: 180,
          flex: 1.4,
        },
        {
          field: "price",
          headerName: "Price",
          minWidth: 100,
          flex: 0.6,
        },
        {
          field: "Stock",
          headerName: "Stock",
          type: "number",
          minWidth: 80,
          flex: 0.5,
        },
    
        {
          field: "sold",
          headerName: "Sold out",
          type: "number",
          minWidth: 130,
          flex: 0.6,
        },
        {
          field: "Preview",
          flex: 0.8,
          minWidth: 100,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            // const d = params.row.name;
            // const product_name = d.replace(/\s+/g, "-");
            return (
              <>
                <Link to={`/product/${params.id}`}>
                  <Button>
                    <AiOutlineEye size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
        {
          field: "Delete",
          flex: 0.8,
          minWidth: 120,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Button onClick={() => handleDelete(params.id)} >
                  <AiOutlineDelete size={20} />
                </Button>
              </>
            );
          },
        },
      ];
    
      const row = [];
    
      products &&
        products.forEach((item) => {
          row.push({
            id: item._id,
            name: item.name,
            price: "US$ " + item.discountPrice,
            Stock: item.stock,
            sold: item?.sold_out,
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

export default AllProducts
