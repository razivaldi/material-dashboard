import axios from "axios";
import React, { useContext, useReducer } from "react";
import reducer from '@/reducers/auth_reducer'

const AuthContext = React.createContext();

let userId = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).userId
  : "";

let token = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).token
  : "";

const initialState = {
  userId: userId,
  token: token,
  loading: false,
  error: "",
};

export const AuthProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, initialState);

  const login = (email, password) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const userData = { email: email, password: password };

    axios
      .post(`http://localhost:8000/auth/login`, userData)
      .then((resp) => {
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: resp.data });
        console.log(resp.data);
      })
      .catch((err) => {
        dispatch({ type: "USER_LOGIN_FAIL", payload: err.response.message });
      });
  };

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  const register = (data) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });
     axios
      .post(`http://localhost:8000/auth/signup`, data)
      .then((resp) => {
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: resp.data.message });
        alert(resp.data.message)
      })
      .catch((err) => {
        dispatch({
          type: "USER_REGISTER_FAIL",
          payload: err.response.data.message,
        });
      });
  };

  return (
    <AuthContext.Provider value={{ userState, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext);
};