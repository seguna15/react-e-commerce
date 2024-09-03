import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import { resetErrAction, resetSuccessAction } from "../globalActions/globalActions";

//initialState
const initialState = {
    categories: [],
    category: {},
    loading: false,
    error: null,
    isAdded: false,
    isUpdated: false,
    isDeleted: false,
}

//create category action
export const createCategoryAction = createAsyncThunk(
    "/categories/create",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        
        try{
            const {name, file} = payload;

            //formData
            const formData = new FormData();
            formData.append('name', name)
            formData.append('file', file)

            //make request
            const {data} = await apiClient.post("/categories", formData);
            return data;
        }catch (error) {
            return rejectWithValue(error?.response?.data)
        } 
    }
);

//fetch all categories
export const fetchCategoriesAction = createAsyncThunk(
    "/categories/fetchAll",
    async (payload, {rejectWithValue, getState, dispatch}) => {
        try{
        
            //make request
            const {data} = await apiClient.get("/categories",);
            
            return data;
        }catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data)
        }
    }
);

//slice 
const categorySlice = createSlice({
    name: "categories",
    initialState,
    extraReducers: (builder) => {
        //create categories
        builder.addCase(createCategoryAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createCategoryAction.fulfilled, (state, action) => {
          state.loading = false;
          state.category = action.payload;
          state.isAdded = true;
          toast.success(`${action.payload.message}`, {
            position: "top-center",
          });
        });
        builder.addCase(createCategoryAction.rejected, (state, action) => {
            state.loading = false;
            state.category = null;
            state.isAdded = false;
            state.error = action.payload
            toast.error(`${action.payload.message}`, {
                position: "top-center"
            })
        })

        //fetch all categories
        builder.addCase(fetchCategoriesAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
            
        })
        builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
            state.loading = false;
            state.categories = null;
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
const categoryReducer = categorySlice.reducer;


export default categoryReducer;