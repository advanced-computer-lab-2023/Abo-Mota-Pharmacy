// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticatedPharmacy: false,
  userRolePharmacy: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticatedPharmacy = true;
      state.userRolePharmacy = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticatedPharmacy = false;
      state.userRolePharmacy = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
