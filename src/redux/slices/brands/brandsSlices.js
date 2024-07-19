import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

//initialState
const initialState = {
    brands: [],
    brand: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create brand action
export const createBrandAction = createAsyncThunk(
    "/brands/create",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const {name} = payload;
            //make request
            const {data} = await apiClient.post("/brands", {
              name,
            });
            return data;
        }catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);

//fetch all brands
export const fetchBrandsAction = createAsyncThunk(
    "/brands/fetchAll",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            //make request
            const {data} = await apiClient.get("/brands",);
            return data;
        }catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);

//slice 
const brandSlice = createSlice({
    name: "brands",
    initialState,
    extraReducers: (builder) => {
        //create categories
        builder.addCase(createBrandAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createBrandAction.fulfilled, (state, action) => {
          state.loading = false;
          state.brand = action.payload;
          state.isAdded = true;
          toast.success(`${action.payload.message}`, {
            position: "top-center",
          });
        });
        builder.addCase(createBrandAction.rejected, (state, action) => {
            state.loading = false;
            state.brand = null;
            state.isAdded = false;
            state.error = action.payload
            toast.error(`${action.payload.message}`, {
                position: "top-center"
            })
        })

        //fetch all brands
        builder.addCase(fetchBrandsAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchBrandsAction.fulfilled, (state, action) => {
            state.loading = false;
            state.brands = action.payload.brands;
            state.isAdded = true;
        })
        builder.addCase(fetchBrandsAction.rejected, (state, action) => {
            state.loading = false;
            state.brands = null;
            state.isAdded = false;
            state.error = action.payload
            toast.error(`${action.payload.message}`, {
                position: "top-center"
            })
        })

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
})

//generate the reducer
const brandReducer = brandSlice.reducer;


export default brandReducer;