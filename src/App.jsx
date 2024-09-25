import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ManageCoupons from "./components/Admin/Coupons/ManageCoupons";
import AddCoupon from "./components/Admin/Coupons/AddCoupon";
import Login from "./components/Users/Forms/Login";
import AddProduct from "./components/Admin/Products/AddProduct";
import RegisterForm from "./components/Users/Forms/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import OrderHistory from "./components/Admin/Orders/ManageOrders";
import OrderPayment from "./components/Users/Products/OrderPayment";
import ManageAccessories from "./components/Admin/Accessories/ManageAccessories";
import ProductUpdate from "./components/Admin/Products/ProductUpdate";
import ManageStocks from "./components/Admin/Products/ManageStocks";
import AccessoryToAdd from "./components/Admin/Accessories/AccessoryToAdd";
import AddAccessory from "./components/Admin/Accessories/AddAccessory";
import AddBrand from "./components/Admin/Accessories/AddBrand";
import AddColor from "./components/Admin/Accessories/AddColor";
import AllAccessories from "./components/HomePage/AllAccessories";
import UpdateCoupon from "./components/Admin/Coupons/UpdateCoupon";
import Product from "./components/Users/Products/Product";
import ShoppingCart from "./components/Users/Products/ShoppingCart";
import ProductsFilters from "./components/Users/Products/ProductsFilters";
import CustomerProfile from "./components/Users/Profile/CustomerProfile";
import AddReview from "./components/Users/Reviews/AddReview";
import UpdateAccessory from "./components/Admin/Accessories/UpdateAccessory";
import OrdersList from "./components/Admin/Orders/OrdersList";
import ManageOrders from "./components/Admin/Orders/ManageOrders";
import Customers from "./components/Admin/Customers/Customers";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AdminRoutes from "./components/AuthRoute/AdminRoutes";
import UpdateOrders from "./components/Admin/Orders/UpdateOrders";
import BrandsList from "./components/Admin/Accessories/BrandsList";
import ColorList from "./components/Admin/Accessories/ColorList";
import useProfile from "./shared/hooks/useIsAdmin";
import useIsAdmin from "./shared/hooks/useIsAdmin";
import StripeSuccess from "./components/Users/Products/StripeSuccess";
import PayPalSuccess from "./components/Users/Products/PayPalSuccess";
import OrderDetails from "./components/Admin/Orders/OrderDetails";
import AddCategory from "./components/Admin/Accessories/AddCategory";

export const AuthContext = createContext(null);

const App = () => {
      const profile = useIsAdmin()
      
      //profile = null;
      return (
        <AuthContext.Provider value={profile}>
          <BrowserRouter>
            <ToastContainer />
            {/* {!isAdmin && <Navbar />} */}
            <Navbar />
            {/* hide navbar if admin */}
            <Routes>
              {/* admin route */}
              <Route
                path="admin"
                element={
                  <AdminRoutes>
                    <AdminDashboard />
                  </AdminRoutes>
                }
              >
                <Route
                  path=""
                  element={
                    <AdminRoutes>
                      <OrdersList />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="add-product"
                  element={
                    <AdminRoutes>
                      <AddProduct />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="manage-products"
                  element={
                    <AdminRoutes>
                      <ManageStocks />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="products/edit/:id"
                  element={
                    <AdminRoutes>
                      <ProductUpdate />
                    </AdminRoutes>
                  }
                />
                {/* coupons */}
                <Route
                  path="add-coupon"
                  element={
                    <AdminRoutes>
                      <AddCoupon />
                    </AdminRoutes>
                  }
                />
                <Route path="manage-coupon" element={<ManageCoupons />} />
                <Route
                  path="manage-coupon/edit/:code"
                  element={<UpdateCoupon />}
                />
                {/* accessory */}
                {/* <Route path="accessory-to-add" element={<AccessoryToAdd />} />{" "} */}
                <Route
                  path="add-accessory"
                  element={
                    <AdminRoutes>
                      <AddAccessory />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="manage-accessory"
                  element={
                    <AdminRoutes>
                      <ManageAccessories />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="edit-accessory/:id"
                  element={
                    <AdminRoutes>
                      <UpdateAccessory />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="add-brand"
                  element={
                    <AdminRoutes>
                      <AddBrand />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="add-category"
                  element={
                    <AdminRoutes>
                      <AddCategory />
                    </AdminRoutes>
                  }
                />
                <Route path="all-brands" element={<BrandsList />} />
                <Route
                  path="add-color"
                  element={
                    <AdminRoutes>
                      <AddColor />
                    </AdminRoutes>
                  }
                />
                <Route path="all-colors" element={<ColorList />} />
                <Route path="manage-orders" element={<ManageOrders />} />
                <Route
                  path="orders/:id"
                  element={
                    <AdminRoutes>
                      <UpdateOrders />
                    </AdminRoutes>
                  }
                />
                <Route
                  path="orders-details/:id"
                  element={
                    <AdminRoutes>
                      <OrderDetails />
                    </AdminRoutes>
                  }
                />

                <Route
                  path="customers"
                  element={
                    <AdminRoutes>
                      <Customers />
                    </AdminRoutes>
                  }
                />
              </Route>

              {/* public links */}
              {/* Products */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products-filters" element={<ProductsFilters />} />
              <Route path="/products/:id" element={<Product />} />
              <Route path="/all-accessories" element={<AllAccessories />} />
              <Route path="stripe-success" element={<StripeSuccess />} />
              <Route path="paypal-success" element={<PayPalSuccess />} />
              {/* review */}
              <Route
                path="/add-review/:id"
                element={
                  <AuthRoute>
                    <AddReview />
                  </AuthRoute>
                }
              />

              {/* shopping cart */}
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route
                path="/order-payment"
                element={
                  <AuthRoute>
                    <OrderPayment />
                  </AuthRoute>
                }
              />
              {/* users */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/customer-profile"
                element={
                  <AuthRoute>
                    <CustomerProfile />
                  </AuthRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthContext.Provider>
      );
};

export default App;

