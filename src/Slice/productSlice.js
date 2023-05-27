import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  data: [],
  loading: false
};
export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
});

export const deleteProduct = createAsyncThunk("deleteProduct", async (id) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`, {
    method: "DELETE"
  });
  const data = await response.json();
  return data;
});
export const addProduct = createAsyncThunk("addProduct", async (product) => {
  const response = await fetch(`https://dummyjson.com/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });

  const data = await response.json();
  // console.log(data);
  return data;
});

export const productSlice = createSlice({
  name: "product",
  initialState,

  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.loading = false;
    },
    [addProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.data.push(action.payload);
    },
    [addProduct.rejected]: (state, action) => {
      state.loading = false;
    },
    [deleteProduct.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;

      const { id } = action.payload;
      if (id) {
        state.data = state.data.filter((ele) => ele.id !== id);
      }
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
    }
  },
  reducers: {}
});
// export const { removeProduct } = productSlice.actions;
export default productSlice.reducer;
