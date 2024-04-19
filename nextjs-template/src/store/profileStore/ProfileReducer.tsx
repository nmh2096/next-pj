import { createSlice } from "@reduxjs/toolkit";
import { IProfileStore } from "./interface";

const initialState: IProfileStore = {
  loading: false,
  message: "",
  success: false,
  profileList: [],
  profile:  null,
};

const ProfileReducer = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfileListRequest(state) {
      state.loading = true;
    },
    getProfileListSuccess(state, action) {
      state.loading = false;
      state.success = false;
      state.profileList = state.profileList.map((item) => {
        if (item._id === action.payload.profile._id) {
          return action.payload.profile;
        } else {
          return item;
        }
      });
    },
    getProfileListFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.profile = null;
    },
  }
});

export const ProfileAction = ProfileReducer.actions;

export default ProfileReducer.reducer;