import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initialState
const initialState = {
  coupons: [],
  coupon: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create coupon action
export const createCouponAction = createAsyncThunk(
  "/coupons/create",
  async ({code, discount, startDate, endDate}, { rejectWithValue, getState, dispatch }) => {
    try {
      oad;
      //make request
      const { data } = await apiClient.post("/coupons", {
        code,
        discount,
        startDate,
        endDate,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all coupons
export const fetchCouponsAction = createAsyncThunk(
  "/coupons/fetchAll",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //make request
      const { data } = await apiClient.get("/coupons");
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchCouponAction = createAsyncThunk(
  "/coupons/fetchSingle",
  async (code, { rejectWithValue, getState, dispatch }) => {
    try {
      //make request
      const { data } = await apiClient.get(`/coupons/single?code=${code}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slice
const couponSlice = createSlice({
  name: "coupons",
  initialState,
  extraReducers: (builder) => {
    //create categories
    builder.addCase(createCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload;
      state.isAdded = true;
      toast.success(`${action.payload.message}`, {
        position: "top-center",
      });
    });
    builder.addCase(createCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.isAdded = false;
      state.error = action.payload;
      toast.error(`${action.payload.message}`, {
        position: "top-center",
      });
    });

    //fetch all coupons
    builder.addCase(fetchCouponsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupons = action.payload.coupons;
      state.isAdded = true;
    });
    builder.addCase(fetchCouponsAction.rejected, (state, action) => {
      state.loading = false;
      state.coupons = null;
      state.isAdded = false;
      state.error = action.payload;
      toast.error(`${action.payload.message}`, {
        position: "top-center",
      });
    });

    //fetch single coupon
    builder.addCase(fetchCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon = action.payload.coupon;
      state.isAdded = true;
      toast.success(`${action.payload.message}`, {
        position: "top-center",
      });
    });
    builder.addCase(fetchCouponAction.rejected, (state, action) => {
      state.loading = false;
      state.coupon = null;
      state.isAdded = false;
      state.error = action.payload;
      toast.error(`${action.payload.message}`, {
         position: "top-center",
       });
    });

    //reset success action
    builder.addCase(resetSuccessAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
    // reset error action
    builder.addCase(resetErrAction.pending, (state, action) => {
      state.isAdded = false;
      state.error = null;
    });
  },
});

//generate the reducer
const couponReducer = couponSlice.reducer;

export default couponReducer;
