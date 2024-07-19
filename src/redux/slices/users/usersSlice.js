import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify";

import { apiClient } from "../../../api"
import { resetErrAction } from "../globalActions/globalActions";

// Initial State
const initialState = {
    loading: false,
    error: null,
    users: [],
    user: {},
    profile: {},
    userAuth: {
        loading: false,
        error: null,
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
    }
}

//login action
export const loginUserAction = createAsyncThunk('users/login', async({email, password}, {rejectWithValue}) => {
    try {
        const {data} = await apiClient.post('auth/login', {
            email,
            password
        }, {withCredentials: true})
        localStorage.setItem('userInfo', JSON.stringify(data))
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

//register action
export const registerUserAction = createAsyncThunk('users/register', async({fullname, email, password}, {rejectWithValue}) => {
    try {
        const {data} = await apiClient.post('auth/register', {
            email,
            password,
            fullname,
        })
        
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

//users slice 
const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        //handle action
        //login
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userAuth.loading = true
        });
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = {token: action.payload.token, userData: action.payload.userData};
            state.userAuth.loading= false;
            toast.success(action.payload.message, {
                position: "top-center"
            })
        });
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;
            toast.error(action.payload.message, {
              position: "top-center",
            });
        })

        //register
        builder.addCase(registerUserAction.pending, (state) => {
            state.loading = true
        });
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.user = action.payload
            state.loading= false;
            toast.success(action.payload.message, {
                position: "top-center"
            })
        });
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            toast.error(action.payload.message, {
              position: "top-center",
            });
        })

        /* //reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null
        }) */
    }
})


//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;