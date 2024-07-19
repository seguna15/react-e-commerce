import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import categoryReducer from "../slices/categories/categoriesSlices";
import brandReducer from "../slices/brands/brandsSlices";
import colorReducer from "../slices/colors/colorsSlice";
import cartReducer from "../slices/cart/cartSlices";
import couponReducer from "../slices/coupons/couponsSlice";

//store

const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productReducer,
        categories: categoryReducer,
        brands: brandReducer,
        colors: colorReducer,
        carts: cartReducer,
        coupons: couponReducer,
    },
})

export default store;