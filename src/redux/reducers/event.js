import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isLoading: true,
};

//create events
export const eventReducer = createReducer(initialState, {
  eventCreateRequest: (state) => {
    state.isLoading = true;
  },
  eventCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.success = true;
    state.event = action.payload;
  },
  eventCreateFail: (state, action) => {
    state.isLoading = false;
    state.success = false;
    state.error = action.payload;
  },

  //get all events of shop
  getAllEventsShopRequest: (state) => {
    state.isLoading = true;
  },
  getAllEventsShopSuccess: (state, action) => {
    state.isLoading = false;
    state.events = action.payload;
  },
  getAllEventsShopFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all events
  getAlleventsRequest: (state) => {
    state.isLoading = true;
  },
  getAlleventsSuccess: (state, action) => {
    state.isLoading = false;
    state.allEvents = action.payload;
  },
  getAlleventsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  deleteeventRequest: (state) => {
    state.isLoading = true;
  },

  deleteeventSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteeventFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
