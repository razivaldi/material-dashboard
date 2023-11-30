import {
  GET_ORDERS_BEGIN,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_ERROR
} from "../components/actions";
const orders_reducer = (state, action) => {
  if (action.type === GET_ORDERS_BEGIN) {
    return { 
      ...state, 
      orders_loading: true 
    };
  }
  if (action.type === GET_ORDERS_SUCCESS) {
    return {
      ...state,
      orders_loading: false,
      orders: action.payload,
    };
  }
  if (action.type === GET_ORDERS_ERROR) {
    return { 
      ...state, 
      orders_loading: false, 
      orders_error: true 
    };
  }
  
}

export default orders_reducer