import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './components/Product/ProductSclice'
import UserReducer from './components/auth/userSclice'
import cardReducer from './components/card/cardSclice'
import orderReducer from './components/order/orderSclice'
import adminProductSclice from './components/Admin-feature/AdminSclice'

export const store = configureStore({
  reducer: {
    Product: ProductReducer,
    User: UserReducer,
    Card: cardReducer,
    Order: orderReducer,
    admin: adminProductSclice

  },
})