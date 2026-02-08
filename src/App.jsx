import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPassPage from './pages/ForgotPassPage'
import DetailProductPage from './pages/DetailProductPage'
import ProductPage from './pages/ProductPage'
import CheckoutProdutPage from './pages/CheckoutProdutPage'
import HistoryOrder from './pages/HistoryOrderPage'
import DetailOrderPage from './pages/DetailOrderPage'
import ProfilePage from './pages/ProfilePage'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Product from './pages/admin/Product'
import Order from './pages/admin/Order'

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/register",
        element: <RegisterPage/>
    },
    {
        path: "/forgot",
        element: <ForgotPassPage/>
    },
    {
        path: "/details-product/:id",
        element: <DetailProductPage/>
    },
    {
        path: "/product",
        element: <ProductPage/>
    },
    {
        path: "/checkout-product",
        element: <CheckoutProdutPage/>
    },
    {
        path: "/history-order",
        element: <HistoryOrder/>
    },
    {
        path: "/detail-order/:id",
        element: <DetailOrderPage/>
    },
    {
        path: "/profile",
        element: <ProfilePage/>
    },
    {
        path: "/admin",
        element: <AdminLayout/>,
        children:[
            {
                path: "dashboard",
                element:<Dashboard/>
            },
            {
                path: "product",
                element: <Product/>
            },
            {
                path: "order",
                element: <Order/>
            }
        ]
    }

])

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
