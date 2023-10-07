
import {createReducer} from "@reduxjs/toolkit"
const initialState = {
    isLoading: true,
}


//create products
export const productReducer = createReducer(initialState, {
    productCreateRequest: (state) => {
        state.isLoading = true;
    },
    productCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.product = action.payload;
    },
    productCreateFail: (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
    },
    

    //get all products of shop
    getAllProductsShopRequest: (state) => {
        state.isLoading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
        state.isLoading = false
        state.products = action.payload;
    },
    getAllProductsShopFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },


    // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
    // state.products = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

    deleteProductRequest: (state) => {
        state.isLoading = true;
    },

    deleteProductSuccess: (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    },
    deleteProductFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;
    }
})


