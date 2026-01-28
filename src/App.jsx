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
        path: "/details-product",
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
        path: "/detail-order",
        element: <DetailOrderPage/>
    },
    {
        path: "/profile",
        element: <ProfilePage/>
    }
])

export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}
