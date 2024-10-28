import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/api/apiSlice"
import userReducer from "./slices/userSlice"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
})

export default store
