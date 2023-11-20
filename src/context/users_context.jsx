import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/users_reducer'
import {
  GET_USERS_BEGIN,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from '../components/actions'

const initialState = {
  users_loading: false,
  users_error: false,
  users: [], 
}

const UsersContext = React.createContext()

export const users_url = import.meta.env.VITE_USER_URL

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [selectedRows, setSelectedRows] = React.useState(false);


  const fetchUsers = async (users_url) => {
    
    dispatch({ type: GET_USERS_BEGIN })
    try {
      const response = await axios.get(`${users_url}/users`)
      const users = response.data
      dispatch({ type: GET_USERS_SUCCESS, payload: users.data })
    } catch (error) {
      console.log(error)
      dispatch({ type: GET_USERS_ERROR })
    }
  }

  const deleteUser = async (id) => {
    dispatch({ type: DELETE_USER_BEGIN })
    try {
      const response =await axios.post(`${users_url}/delete-user`, {userId : id})
      const users = response.data
      dispatch({ type: DELETE_USER_SUCCESS, payload: users })
    } catch (error) {
      console.log(error)
      dispatch({ type: DELETE_USER_ERROR})
    }
  }

  const updateUser = async (data) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const response = await axios.post(`${users_url}/update-user`, data)
      const users = response.data
      dispatch({ type: UPDATE_USER_SUCCESS, payload: users })
    } catch (error) {
      console.log(error)
      dispatch({ type: UPDATE_USER_ERROR })
    }
  }

  useEffect(() => {
    fetchUsers(users_url)
  }, [])

  return (
    <UsersContext.Provider
      value={{
        ...state,
        fetchUsers,
        selectedRows,
        setSelectedRows,
        deleteUser, 
        updateUser
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
// make sure use
export const useUsersContext = () => {
  return useContext(UsersContext)
}
