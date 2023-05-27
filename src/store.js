import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice";
export const store = configureStore({
  reducer: {
    Product: productReducer
  }
});
