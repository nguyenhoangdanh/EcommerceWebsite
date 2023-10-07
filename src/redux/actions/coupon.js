import axios from "axios";
import { server } from "../../server";

//create couponCode
export const createcouponCode = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "couponCodeCreateRequest",
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/coupon/create-coupon-code`,
      newForm,
      config
    );
    dispatch({
      type: "couponCodeCreateSuccess",
      payload: data.couponCodes,
    });
  } catch (error) {
    dispatch({
      type: "couponCodeCreateFail",
      payload: error.response.data.message,
    });
  }
};

//get All couponCode of shop
// export const getAllcouponCodesShop = (id) => async(dispatch) => {
//   try {
//     dispatch({
//       type: "getAllcouponCodesShopRequest"
//     });

//     const {data} = await axios.get(`${server}/couponCode/get-all-couponCodes/${id}`);

//     dispatch({
//       type: "getAllcouponCodesShopSuccess",
//       payload: data.couponCodes,
//     })
//   } catch (error) {
//     dispatch({
//       type: "getAllcouponCodesShopFail",
//       payload: error.response.data.message,
//     });
//   }
// }

// //delete couponCode of shop
export const deletecouponCode = (id) => async(dispatch) => {
  try {
    dispatch({
      type: "deletecouponCodeRequest"
    });

    const {data} = await axios.delete(`${server}/coupon/delete-shop-couponcode/${id}`,
    {withCredentials: true
    });

    dispatch({
      type: "deletecouponCodeSuccess",
      payload: data.message,
    })
  } catch (error) {
    dispatch({
      type: "deletecouponCodeFail",
      payload: error.response.data.message,
    });
  }
}
