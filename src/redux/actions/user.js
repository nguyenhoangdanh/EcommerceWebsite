import axios from "axios";
import { server } from "../../server";

//Load User
export const LoadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

//Load Seller
export const LoadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

//update userInfo

export const updateUserInfo =
  (name, email, password, phoneNumber) => async (dispatch, action) => {
    try {
      dispatch({
        type: "UpdateUserInfoRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          password,
          phoneNumber,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch({
        type: "UpdateUserInfoSuccess",
        
            payload: data.user,
        
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserInfoFailed",
        payload: error.response.data.message,
      });
    }
  };

//update userInfo

export const updateUserAddress =
  (country, city, address1, address2, zipCode, addressType) => async (dispatch) => {
    try {
      dispatch({
        type: "UpdateUserAddressRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-addresses`,
        {
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      dispatch({
        type: "UpdateUserAddressSuccess",
        payload: {
            successMessage: "User address updated successfully!",
            user: data.user,
        }
      });
    } catch (error) {
      dispatch({
        type: "UpdateUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };


  // delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "deleteUserAddressRequest",
      });
  
      const { data } = await axios.delete(
        `${server}/user/delete-user-address/${id}`,
        { withCredentials: true }
      );
  
      dispatch({
        type: "deleteUserAddressSuccess",
        payload: {
          successMessage: "User deleted successfully!",
          user: data.user,
        },
      });
    } catch (error) {
      dispatch({
        type: "deleteUserAddressFailed",
        payload: error.response.data.message,
      });
    }
  };



  // get all users --- admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }
};