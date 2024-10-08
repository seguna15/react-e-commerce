import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

//initialState
const initialState = {
    products: [],
    product: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create product action
export const createProductAction = createAsyncThunk(
    "/product/create",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        console.log(payload)
        try{
            const {
              name,
              description,
              category,
              accessory,

              brand,
              price,
              files,
              sizeColourQty,
            } = payload;
            //make request

            //FormData
            const formData = new FormData();
            formData.append('name', name)
            formData.append('description', description)
            formData.append('category', category)
            formData.append('accessory', accessory)
            
           
            formData.append('brand', brand)
            
            formData.append('price', price)
            
            formData.append('files', files)

           /*  sizeColourQty.forEach((item) => {
               formData.append("sizeColourQty", JSON.stringify(item))
            }) */

            formData.append("sizeColourQty",JSON.stringify(sizeColourQty))
            
            files.forEach(file => {
                formData.append("files", file)
            })
            
            const { data } = await apiClient.post("/products", formData );
            return data;
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//update product action
export const updateProductAction = createAsyncThunk(
    "/product/update",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        
        try{
            
            const {name, description, category, sizes, brand, colors, price, totalQty, id} = payload;
            //make request
            const { data } = await apiClient.put(`/products/update/${id}`, {
              name,
              description,
              category,
              sizes,
              brand,
              colors,
              price,
              totalQty,
            });
            return data;
        }catch (error) {
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch All Products
export const fetchProductsAction = createAsyncThunk(
    "/product/fetchAll",
    async ( {url}, {rejectWithValue, getState, dispatch}) => {
        
        try{
            
            const {data} = await apiClient.get(url);
            return data;
        }catch (error) {
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch Single Product
export const fetchSingleProductAction = createAsyncThunk(
    "/product/details",
    async ( productId, {rejectWithValue, getState, dispatch}) => {
        
        try{
            
            const {data} = await apiClient.get(`/products/${productId}`);
            return data;
        }catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//slice 
const productSlice = createSlice({
    name: "products",
    initialState,
    extraReducers: (builder) => {
      //create product
      builder.addCase(createProductAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.isAdded = true;
        toast.success(`${action.payload.message}`, {
          position: "top-center",
        });
      });
      builder.addCase(createProductAction.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.isAdded = false;
        state.error = action.payload;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });
      
      //update product
      builder.addCase(updateProductAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(updateProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.isUpdated = true;
        toast.success(`${action.payload.message}`, {
          position: "top-center",
        });
      });
      builder.addCase(updateProductAction.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.isUpdated = false;
        state.error = action.payload;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      //fetch all product
      builder.addCase(fetchProductsAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        
      });
      builder.addCase(fetchProductsAction.rejected, (state, action) => {
        state.loading = false;
        state.products = null;
        state.error = action.payload;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      //fetch single product
      builder.addCase(fetchSingleProductAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchSingleProductAction.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
      });
      builder.addCase(fetchSingleProductAction.rejected, (state, action) => {
        state.loading = false;
        state.product = null;
        state.error = action.payload.message;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      builder.addCase(resetSuccessAction.pending, (state, action) => {
        state.isAdded = false;
      })

      builder.addCase(resetErrAction.pending, (state, action) => {
        state.error = null
      })
      
    },
})

//generate the reducer
const productReducer = productSlice.reducer;


export default productReducer;