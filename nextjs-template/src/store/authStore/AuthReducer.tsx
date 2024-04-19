import { createSlice } from "@reduxjs/toolkit";
import { IAuthStore } from "./interface";

const initialState: IAuthStore = {
  loading: false,
  message: "",
  success: true,
  profile: null,
};

const AuthReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state, _) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.success = true;
    },
    loginFail(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.success = false;

    },
    registerRequest(state, _) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    registerFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    getAuthRequest(state) {
      state.loading = true;
    },
    getAuthSuccess(state, action) {
      state.loading = false;
      // state.message = action.payload;
      state.profile = action.payload.user;
      state.success = true;
    },
    getAuthFail(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },
    getProfileRequest(state,_) {
      state.loading = true;
    },
    getProfileSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.profile = action.payload.profile;
    },
    getProfileFail(state, _) {
      state.loading = false;
      state.success = false;
      state.profile = null;
    },
  },
});

export const AuthAction = AuthReducer.actions;

export default AuthReducer.reducer;