/**
=========================================================
* Material Tailwind Dashboard React - v2.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { ProductsProvider } from "./context/products_context";
import "../public/css/tailwind.css";
import { UsersProvider } from "./context/users_context";
import { AuthProvider } from "./context/auth_context";
import { OrdersProvider } from "./context/orders_context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <AuthProvider>
            <ProductsProvider>
              <UsersProvider>
                <OrdersProvider>
                  <App />
                </OrdersProvider>
              </UsersProvider>
            </ProductsProvider>
          </AuthProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
