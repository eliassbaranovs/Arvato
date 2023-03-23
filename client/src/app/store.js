import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resourceReducer from "../features/resources/resourceSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resource: resourceReducer,
    users: usersReducer,
  },
});
