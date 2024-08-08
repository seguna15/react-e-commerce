import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initialState
const initialState = {
  reviews: [],
  review: null,
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create review action
export const createReviewAction = createAsyncThunk(
  "/reviews/create",
  async ({rating, message, productId}, { rejectWithValue, getState, dispatch }) => {
    try {
      //make request
      const { data } = await apiClient.post(`/reviews/${productId}`, {
        rating,
        message,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);


//slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    //create categories
    builder.addCase(createReviewAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createReviewAction.fulfilled, (state, action) => {
      state.loading = false;
      state.review = action.payload;
      state.isAdded = true;
      toast.success(`${action.payload.message}`, {
        position: "top-center",
      });
    });
    builder.addCase(createReviewAction.rejected, (state, action) => {
      state.loading = false;
      state.review = null;
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
const reviewsReducer = reviewsSlice.reducer;

export default reviewsReducer;
