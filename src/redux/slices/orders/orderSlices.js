import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

//initialState
const initialState = {
    orders: [],
    order: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    stats: null
}

//create order action
export const placeOrderAction = createAsyncThunk(
    "/order/place-order",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const {orderItems, shippingAddress, totalPrice} = payload;
            //make request

            const {data} = await apiClient.post("/orders", payload);
            return window.open(data?.url);
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//update order action
export const updateOrderAction = createAsyncThunk(
    "/order/update-order",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const {status, id,} = payload;
            //make request

            const {data} = await apiClient.patch(`/orders/update/${id}`, {status});
            return data;
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch All orders
export const fetchOrdersAction = createAsyncThunk(
    "/product/fetch-orders",
    async ( payload, {rejectWithValue, getState, dispatch}) => {
        
        try{
            
            const {data} = await apiClient.get("/orders");
            return data;
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch orders statistics
export const fetchOrdersStatisticsAction = createAsyncThunk(
    "/product/fetch-orders-statistics",
    async ( payload, {rejectWithValue, getState, dispatch}) => {
        
        try{
            
            const {data} = await apiClient.get("/orders/sales/stats");
            
            return data;
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch Single Product
export const fetchSingleOrderAction = createAsyncThunk(
    "/order/details",
    async ( orderId, {rejectWithValue, getState, dispatch}) => {
        
        try{
            
            const {data} = await apiClient.get(`/orders/${orderId}`);
            return data;
        }catch (error) {
            
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//slice 
const orderSlice = createSlice({
    name: "orders",
    initialState,
    extraReducers: (builder) => {
      //create order
      builder.addCase(placeOrderAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(placeOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.isAdded = true;
        
      });
      builder.addCase(placeOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.isAdded = false;
        state.error = action.payload;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      //fetch all 
      builder.addCase(fetchOrdersAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchOrdersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        
      });
      builder.addCase(fetchOrdersAction.rejected, (state, action) => {
        state.loading = false;
        state.orders = null;
        state.error = action.payload;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      //fetch stats
      builder.addCase(fetchOrdersStatisticsAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchOrdersStatisticsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
  
      });
      builder.addCase(fetchOrdersStatisticsAction.rejected, (state, action) => {
        state.loading = false;
        state.stats = null;
        state.error = action.payload;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      //fetch stats
      builder.addCase(updateOrderAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(updateOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        state.isUpdated = true;
        toast.success(`${action.payload.message}`, {
          position: "top-center",
        })
      });
      builder.addCase(updateOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = action.payload;
        state.isUpdated = true;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      //fetch single order
      builder.addCase(fetchSingleOrderAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchSingleOrderAction.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
        
      });
      builder.addCase(fetchSingleOrderAction.rejected, (state, action) => {
        state.loading = false;
        state.order = null;
        state.error = action.payload.message;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      builder.addCase(resetErrAction.pending, (state, action) => {
        state.error = null;
      });

      builder.addCase(resetSuccessAction.pending, (state, action) => {
        state.isAdded = false;
        state.isUpdated = false
      })

      
      
    },
})

//generate the reducer
const ordersReducer = orderSlice.reducer;


export default ordersReducer;