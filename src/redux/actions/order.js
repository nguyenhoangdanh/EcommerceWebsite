import axios from "axios";
import { server } from "../../server";

//get All Product of shop
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: " getAllOrdersUserRequest",
    });
    // console.log("user", userId);
    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );
    console.log("data", data);
    dispatch({
      type: "getAllOrdersUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersUserFailed",
      payload: error.response.data.message,
    });
  }
};


//get All Product of shop
export const getAllOrdersOfShop = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: " getAllOrdersShopRequest",
    });
    // console.log("user", userId);
    const { data } = await axios.get(
      `${server}/order/get-seller-all-orders/${shopId}`
    );
    dispatch({
      type: "getAllOrdersShopSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFailed",
      payload: error.response.data.message,
    });
  }
};


// get all orders of Admin
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "adminAllOrdersRequest",
    });

    const { data } = await axios.get(`${server}/order/admin-all-orders`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "adminAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};
