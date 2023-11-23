import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR, 
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR, 
  DELETE_PRODUCTS_BEGIN,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_ERROR
} from '../components/actions'
import { Navigate, redirect, useNavigate } from 'react-router-dom'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const products_url =  `${import.meta.env.VITE_BASE_URL}/products`
export const single_product_url = import.meta.env.VITE_BASE_URL

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [selectedRows, setSelectedRows] = React.useState(false);
  const navigate = useNavigate()
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async () => {
    
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`)
      const products = response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async () => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}`)
      const singleProduct = response.data
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }
  
  const deleteSomeProducts = async (data) => {
    console.log(data)
    dispatch({ type: DELETE_PRODUCTS_BEGIN })
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/delete-some-products`,{productId: data})
      const products = response.data
      dispatch({ type: DELETE_PRODUCTS_SUCCESS, payload: products })
      await fetchProducts()
      navigate('/dashboard/tables')
    } catch (error) {
      dispatch({ type: DELETE_PRODUCTS_ERROR })
    }
  }

  const deleteSingleProduct = async (id) => {
    dispatch({ type: DELETE_PRODUCT_BEGIN })
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/delete-product`,{productId : id})
      const products = response.data
      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: products })
      await fetchProducts()
      navigate('/dashboard/tables')
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_ERROR })
    }
  }

  const updateSingleProduct = async (formData) => {
    dispatch({ type: UPDATE_PRODUCT_BEGIN })
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/update-product`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      const products = response.data
      dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: products })
      await fetchProducts()
      navigate('/dashboard/tables')
    } catch (error) {
      dispatch({ type: UPDATE_PRODUCT_ERROR })
    }
  }

  const addProduct = async (formData) => {
    const token = JSON.parse(localStorage.getItem("userInfo")).token
    dispatch({ type: ADD_PRODUCT_BEGIN })
    try {
      const response = await axios.post(`${import.meta.env.VITE_USER_URL}/add-product`,formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + token
        }
      })
      const product = response.data
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: product })
      await fetchProducts()
      alert("Product added successfully")
    } catch (error) {
      dispatch({ type: ADD_PRODUCT_ERROR })
    }
  }


  useEffect(() => {
    fetchProducts(products_url)
  }, [])

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
        fetchSingleProduct,
        updateSingleProduct,
        deleteSingleProduct, 
        selectedRows,
        setSelectedRows,
        addProduct, 
        deleteSomeProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
