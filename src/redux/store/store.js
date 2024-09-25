import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productReducer from "../slices/products/productSlices";
import accessoryReducer from "../slices/accessories/accessoriesSlices";
import brandReducer from "../slices/brands/brandsSlices";
import colorReducer from "../slices/colors/colorsSlice";
import cartReducer from "../slices/cart/cartSlices";
import couponReducer from "../slices/coupons/couponsSlice";
import ordersReducer from "../slices/orders/orderSlices";
import reviewsReducer from "../slices/reviews/reviewsSlice";
import categoryReducer from "../slices/categories/categoriesSlices";

//store

const store = configureStore({
    reducer: {
        users: usersReducer,
        products: productReducer,
        accessories: accessoryReducer,
        brands: brandReducer,
        colors: colorReducer,
        carts: cartReducer,
        coupons: couponReducer,
        orders: ordersReducer,
        reviews: reviewsReducer,
        categories: categoryReducer,
    },
})

export default store;