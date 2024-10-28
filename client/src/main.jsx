import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { Provider } from "react-redux"
import store from "./store"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import RequireAuth from "./components/RequireAuth.jsx"
import { AuthProvider } from "./context/UserContext.jsx"
import { ConfigProvider } from "antd"
import ServerError from "./components/exceptionPages/ServerError.jsx"
import Missing from "./components/exceptionPages/Missing.jsx"
import PrivateRoutes from "./components/PrivateRoutes.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import Unauthorized from "./components/exceptionPages/Unauthorized.jsx"
import HomePage from "./pages/HomePage.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route element={<App />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Private Routes */}
      <Route element={<App />}>
        <Route path="/" element={<HomePage />} />
      </Route>

      <Route path="/server-error" element={<ServerError />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<Missing />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </AuthProvider>
)
