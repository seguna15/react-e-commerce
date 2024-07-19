import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../api";
import { toast } from "react-toastify";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

//initialState
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};


//add product to cart
export const addOrderToCartAction = createAsyncThunk('cart/add-to-cart', async (cartItem) => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    
    //push to storage
    cartItems.push(cartItem)

    //save to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
})

//get product from cart
export const getCartItemsFromLocalStorageAction = createAsyncThunk('cart/get-order-items', async () => {
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    
    //save to localStorage
    return cartItems
})

//change item qty and total price in to cart
export const changeOrderItemQty = createAsyncThunk('cart/change-item-qty', async ({productId, qty}) => {
  
    const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
    
    const newCartItems = cartItems?.map((item) => {
      if(item?._id?.toString() === productId?.toString()){
        const newPrice = item?.price * qty;
        item.qty = +qty
        item.totalPrice = newPrice
      }

      return item
    }) 

    localStorage.setItem("cartItems", JSON.stringify(newCartItems))

    //save to localStorage
    return cartItems
})

//remove items from cart
export const removeOrderItem = createAsyncThunk('cart/remove-order-item', async (productId) => {
  
     const cartItems = localStorage.getItem("cartItems")
       ? JSON.parse(localStorage.getItem("cartItems"))
       : [];

       const newItems = cartItems?.filter((item) => item?._id !== productId)
       localStorage.setItem('cartItems', JSON.stringify(newItems))
    
})

//slice 
const cartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers: (builder) => {
        //add to cart
        builder.addCase(addOrderToCartAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(addOrderToCartAction.fulfilled, (state, action) => {
          state.loading = false;
          state.cartItems = action.payload;
          state.isAdded = true;
          toast.success("Product added to cart successfully", {
            position: "top-center",
          });
        });
        builder.addCase(addOrderToCartAction.rejected, (state, action) => {
            state.loading = false;
            state.cartItems = null;
            state.isAdded = false;
            state.error = action.payload
            toast.error('Items cannot be added to cart', {
                position: "top-center"
            })
        })

        //fetch  cart items
        builder.addCase(getCartItemsFromLocalStorageAction.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getCartItemsFromLocalStorageAction.fulfilled, (state, action) => {
          state.loading = false;
          state.cartItems = action.payload;
          state.isAdded = true;
        });

        builder.addCase(getCartItemsFromLocalStorageAction.rejected, (state, action) => {
            state.loading = false;
            state.cartItems = null;
            state.isAdded = false;
            state.error = action.payload
            toast.error("Oops we couldn't fetch cart items", {
                position: "top-center"
            })
        })

    },
})

//generate the reducer
const cartReducer = cartSlice.reducer;


export default cartReducer;