import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import { resetSuccessAction, resetErrAction } from "../globalActions/globalActions";

//initialState
const initialState = {
    colors: [],
    color: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create color action
export const createColorAction = createAsyncThunk(
    "/colors/create",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
            const {name} = payload;
            //make request
            const {data} = await apiClient.post("/colors", {
              name,
            });
            return data;
        }catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
);

//fetch all colors
export const fetchColorsAction = createAsyncThunk(
    "/colors/fetchAll",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
        
            //make request
            const {data} = await apiClient.get("/colors",);
            return data;
        }catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data)
        }
    }
);

//slice 
const colorSlice = createSlice({
    name: "colors",
    initialState,
    extraReducers: (builder) => {
      //create categories
      builder.addCase(createColorAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(createColorAction.fulfilled, (state, action) => {
        state.loading = false;
        state.color = action.payload;
        state.isAdded = true;
        toast.success(`${action.payload.message}`, {
          position: "top-center",
        });
      });
      builder.addCase(createColorAction.rejected, (state, action) => {
        state.loading = false;
        state.color = null;
        state.isAdded = false;
        state.error = action.payload;
        toast.error(`${action.payload.message}`, {
          position: "top-center",
        });
      });

      //fetch all colors
      builder.addCase(fetchColorsAction.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(fetchColorsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.colors = action.payload.colors;
        state.isAdded = true;
      });
      builder.addCase(fetchColorsAction.rejected, (state, action) => {
        state.loading = false;
        state.colors = null;
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
})

//generate the reducer
const colorReducer = colorSlice.reducer;


export default colorReducer;