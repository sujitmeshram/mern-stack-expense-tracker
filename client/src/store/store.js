import { configureStore } from "@reduxjs/toolkit";
import { expenseSlice } from "./reducer";
import { apiSlice } from "./apiSlice";

//store
export const store = configureStore({
  reducer: {
    expense: expenseSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  //get default middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
