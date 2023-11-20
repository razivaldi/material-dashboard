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

const users_reducer = (state, action) => {
 
  if (action.type === GET_USERS_BEGIN) {
    return { ...state, users_loading: true }
  }
  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      users_loading: false,
      users: action.payload,
    }
  }
  if (action.type === GET_USERS_ERROR) {
    return { ...state, users_loading: false, users_error: true }
  }

  if (action.type === DELETE_USER_BEGIN) {
    return { ...state, users_loading: true }
  }
  
  if (action.type === DELETE_USER_SUCCESS) {
    return {
      ...state,
      users_loading: false,
      users: action.payload,
    }
  }
  if (action.type === DELETE_USER_ERROR) {
    return { ...state, users_loading: false, users_error: true }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, users_loading: true }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      users_loading: false,
      users: action.payload,
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return { ...state, users_loading: false, users_error: true }
  }

  throw new Error(`No Matching "${action.type}" - action type`)
}

export default users_reducer
