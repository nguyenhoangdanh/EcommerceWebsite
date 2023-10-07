import {createReducer} from "@reduxjs/toolkit"
const initialState = {
    isLoading: true,
}


//create category
export const categoryReducer = createReducer(initialState, {
    categoryCreateRequest: (state) => {
        state.isLoading = true;
    },
    categoryCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.category = action.payload;
    },
    categoryCreateFail: (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
    },
    

//     //get all categorys of shop
//     getAllcategorysShopRequest: (state) => {
//         state.isLoading = true;
//     },
//     getAllcategorysShopSuccess: (state, action) => {
//         state.isLoading = false
//         state.categorys = action.payload;
//     },
//     getAllcategorysShopFail: (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//     },


//     // get all categorys
//   getAllcategorysRequest: (state) => {
//     state.isLoading = true;
//   },
//   getAllcategorysSuccess: (state, action) => {
//     state.isLoading = false;
//     state.allcategorys = action.payload;
//     // state.categorys = action.payload;
//   },
//   getAllcategorysFailed: (state, action) => {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//     deletecategoryRequest: (state) => {
//         state.isLoading = true;
//     },

//     deletecategorySuccess: (state, action) => {
//         state.isLoading = false;
//         state.message = action.payload;
//     },
//     deletecategoryFail: (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//     },

    clearErrors: (state) => {
        state.error = null;
    }
})