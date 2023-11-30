import reducer from '../reducers/orders_reducer'
import axios from 'axios'
import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR
} from '../components/actions'
import React, { useContext, useEffect, useReducer } from 'react'

const initialState = {
  orders_loading: false,
  orders_error: false,
  orders: [],
}

const OrdersContext = React.createContext()

export const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchOrders = async () => {
    dispatch({ type: GET_ORDERS_BEGIN })
    try {
      const response = await axios.get(`${import.meta.env.VITE_USER_URL}/user-orders`)
      const orders = response.data
      dispatch({ type: GET_ORDERS_SUCCESS, payload: orders })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_ORDERS_ERROR })
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <OrdersContext.Provider
      value={{ ...state, fetchOrders }}
    >
      {children}
    </OrdersContext.Provider>
  )

}

export const useOrdersContext = () => {
  return useContext(OrdersContext)
}