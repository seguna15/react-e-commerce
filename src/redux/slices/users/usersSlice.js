import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { toast } from "react-toastify";

import { apiClient } from "../../../api"
import { resetErrAction } from "../globalActions/globalActions";

// Initial State
const initialState = {
    loading: false,
    error: null,
    users: [],
    customers: [],
    user: null,
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


//get user profile action
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

//logout user action
export const logoutAction = createAsyncThunk('users/logout', async(payload, {rejectWithValue, getState, dispatch}) => {
    try {
        const { data } = await apiClient.post("auth/logout", {},{
          withCredentials: true,
        });

        localStorage.removeItem("userInfo");
        
        return data;
    } catch (error) {
        
        return rejectWithValue(error?.response?.data)
    }
})

//update user shipping address action
export const updateUserShippingAddressAction = createAsyncThunk('users/update-shipping-address', async({firstName, lastName, address, city, postalCode, province, phoneNumber, country}, {rejectWithValue}) => {
    try {
        const { data } = await apiClient.patch("users/update/shipping", {
          firstName,
          lastName,
          address,
          city,
          postalCode,
          province,
          phoneNumber,
          country,
        });
        
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

//get user profile address action
export const getUserProfileAction = createAsyncThunk('users/profile-fetched', async(payload, {rejectWithValue}) => {
    try {
        const { data } = await apiClient.get("users/profile");
        
        return data;
    } catch (error) {
        return rejectWithValue(error?.response?.data)
    }
})

//get all customers action
export const getAllCustomersAction = createAsyncThunk('users/customers-fetched', async(payload, {rejectWithValue}) => {
    try {
        const { data } = await apiClient.get("users/customers");
        
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
            state.userAuth.userInfo = action.payload
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

        //login
        builder.addCase(logoutAction.pending, (state, action) => {
            state.userAuth.loading = true
        });
        builder.addCase(logoutAction.fulfilled, (state, action) => {
            state.userAuth.userInfo = null;
            state.userAuth.loading= false;
        });
        builder.addCase(logoutAction.rejected, (state, action) => {
            state.userAuth.error = action.payload;
            state.userAuth.loading = false;
            state.user.userInfo= null;
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

        //update shipping
        builder.addCase(updateUserShippingAddressAction.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateUserShippingAddressAction.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.loading= false;
            toast.success(action.payload.message, {
                position: "top-center"
            })
        });
        builder.addCase(updateUserShippingAddressAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            toast.error(action.payload.message, {
              position: "top-center",
            });
        })
        //get all customers
        builder.addCase(getAllCustomersAction.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getAllCustomersAction.fulfilled, (state, action) => {
            state.customers = action.payload.customers
            state.loading= false;
           
        });
        builder.addCase(getAllCustomersAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            toast.error(action.payload.message, {
              position: "top-center",
            });
        })

        //get user profile
        builder.addCase(getUserProfileAction.pending, (state) => {
            state.loading = true
        });
        builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
            state.profile = action.payload.userFound
            state.loading= false;
           
        });
        builder.addCase(getUserProfileAction.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
            toast.error(action.payload.message, {
              position: "top-center",
            });
        })

        //reset error action
        builder.addCase(resetErrAction.pending, (state) => {
            state.error = null
        }) 
    }
})


//generate reducer
const usersReducer = usersSlice.reducer;

export default usersReducer;