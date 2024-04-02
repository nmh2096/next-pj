import { createSlice } from "@reduxjs/toolkit";
import { INoteStore } from "./interface"

const initialState: INoteStore = {
  loading: false,
  message: "",
  success: false,
  noteList: [],
  note: null,
};

const NoteReducer = createSlice({
  name: "note",
  initialState,
  reducers: {
    getNoteListRequest(state) {
      state.loading = true;
    },
    getNoteListSuccess(state, action) {
      state.loading = true;
      state.message = action.payload;
    },
    getNoteListFail(state, action) {
      state.loading = true;
      state.message = action.payload;
    },
    createRequest(state, _) {
      state.loading = true;
    },
    createSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
    createFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
  }
});

export const NoteAction = NoteReducer.actions;

export default NoteReducer.reducer;