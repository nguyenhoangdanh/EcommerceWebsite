import {createReducer} from "@reduxjs/toolkit";

const  initialState = {
    isAuthenticated:   false,
};


//load user
export const userReducer =  createReducer(initialState, {
    LoadUserRequest: (state) => {
        state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = true;
        state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
    },


    //Update user Info
    UpdateUserInfoRequest:(state, action) => {
        state.loading = true;
    },
    UpdateUserInfoSuccess:(state, action)=>{
        state.loading = false;
        state.user = action.payload;
    },
    UpdateUserInfoFailed:(state, action)=>{
        state.loading = false;
        state.error =  action.payload;
    },

    //Update user Address
    UpdateUserAddressRequest:(state, action) => {
        state.addressloading = true;
    },
    UpdateUserAddressSuccess:(state, action)=>{
        state.addressloading = false;
        state.successMessage = action.payload.successMessage;
        state.user = action.payload.user;
    },
    UpdateUserAddressFailed:(state, action)=>{
        state.addressloading = false;
        state.error = action.payload;
    },

     // delete user address
  deleteUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.user = action.payload.user;
  },
  deleteUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },

// get all users --- admin
getAllUsersRequest: (state) => {
    state.usersLoading = true;
  },
  getAllUsersSuccess: (state,action) => {
    state.usersLoading = false;
    state.users = action.payload;
  },
  getAllUsersFailed: (state,action) => {
    state.usersLoading = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
})


