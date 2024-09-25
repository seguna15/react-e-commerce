import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

//initialState
const initialState = {
    accessories: [],
    accessory: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create accessory action
export const createAccessoryAction = createAsyncThunk(
    "/accessories/create",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        
        try{
            const {name, file} = payload;

            //formData
            const formData = new FormData();
            formData.append('name', name)
            formData.append('file', file)

            //make request
            const {data} = await apiClient.post("/accessories", formData);
            return data;
        }catch (error) {
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch all accessories
export const fetchAccessoriesAction = createAsyncThunk(
    "/accessories/fetchAll",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
        
            //make request
            const {data} = await apiClient.get("/accessories",);
            
            return data;
        }catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data)
        }
    }
);

//slice 
const accessorySlice = createSlice({
    name: "accessories",
    initialState,
    extraReducers: (builder) => {
        //create accessories
        builder.addCase(createAccessoryAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createAccessoryAction.fulfilled, (state, action) => {
          state.loading = false;
          state.accessory = action.payload;
          state.isAdded = true;
          toast.success(`${action.payload.message}`, {
            position: "top-center",
          });
        });
        builder.addCase(createAccessoryAction.rejected, (state, action) => {
            state.loading = false;
            state.accessory = null;
            state.isAdded = false;
            state.error = action.payload
            toast.error(`${action.payload.message}`, {
                position: "top-center"
            })
        })

        //fetch all accessories
        builder.addCase(fetchAccessoriesAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAccessoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.accessories = action.payload.accessories;
            
        })
        builder.addCase(fetchAccessoriesAction.rejected, (state, action) => {
            state.loading = false;
            state.accessories = null;
            state.error = action.payload
            toast.error(`${action.payload.message}`, {
                position: "top-center"
            })
        })

        //Reset err
        builder.addCase(resetErrAction.pending, (state, action) => {
            state.error = null
        })

        //Reset success
        builder.addCase(resetSuccessAction.pending, (state, action) => {
            state.isAdded = false
        })
    },
})

//generate the reducer
const accessoryReducer = accessorySlice.reducer;


export default accessoryReducer;