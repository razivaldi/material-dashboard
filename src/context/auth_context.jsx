import axios from "axios";
import React, { useContext, useReducer } from "react";
import reducer from "@/reducers/auth_reducer";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

let userId = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).userId
  : "";

let token = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).token
  : "";

let role = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")).role
  : "";

const initialState = {
  userId: userId,
  token: token,
  loading: false,
  error: "",
  role: role,
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userState, dispatch] = useReducer(reducer, initialState);

  const login = (email, password) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const userData = { email: email, password: password };

    axios
      .post(`${import.meta.env.VITE_AUTH_URL}/login`, userData)
      .then((resp) => {
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: resp.data });
        console.log(resp.data.role);
        if (resp.data.role === "admin") {
          navigate("/dashboard/home");
        } else if (resp.data.role === "user") {
          window.location.href = "https://ecom.aldiverse.com/";
        }
      })
      .catch((err) => {
        dispatch({ type: "USER_LOGIN_FAIL", payload: err.response.message });
      });
  };

  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    navigate("/dashboard/home");
  };

  const register = (data) => {
    dispatch({ type: "USER_REGISTER_REQUEST" });
    axios
      .post(`${import.meta.env.VITE_AUTH_URL}/signup`, data)
      .then((resp) => {
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: resp.data.message });
        alert(resp.data.message);
      })
      .catch((err) => {
        dispatch({
          type: "USER_REGISTER_FAIL",
          payload: err.response.data.message,
        });
        alert(err.response.data.message);
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
