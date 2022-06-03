import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "http://localhost:8080";

//code to need the fetch the data from server
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),

  endpoints: (builder) => ({
    //get categories
    getCategories: builder.query({
      //get : 'http://localhost:8080/api/categories
      query: () => "/api/categories",
      providesTags: ["categories"],
    }),

    //get labels, and for getting the data from database use query function
    getLabels: builder.query({
      query: () => "/api/labels",
      providesTags: ["transaction"],
    }),

    //add new Transaction, whenever we need to create or update or delete the transaction we use mutation fucntion
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        //post : 'http://localhost:8080/api/transaction'
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ["transaction"],
    }),

    //delete record
    deleteTransaction: builder.mutation({
      query: (recordid) => ({
        //delete : 'http://localhost:8080/api/transaction'
        url: "/api/transaction",
        method: "DELETE",
        body: recordid,
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export default apiSlice;
