import AuthReducer from "./Reducers/AuthReducer";
import { configureStore } from "@reduxjs/toolkit";

const Store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});
export default Store;
