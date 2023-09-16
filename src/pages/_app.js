import '@/styles/globals.css'
import { configureStore } from '@reduxjs/toolkit'
import { store } from '../store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
