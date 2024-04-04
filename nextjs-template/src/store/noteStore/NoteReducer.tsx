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
      state.loading = false;
      state.noteList = action.payload.notes;
      state.success = true;
    },
    getNoteListFail(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.success = false;

    },
    createNoteListRequest(state, _) {
      state.loading = true;
    },
    createNoteListSuccess(state, action) {
      console.log(state.noteList);
      state.loading = false;
      state.success = true;
      state.noteList.push(action.payload.notes);
      
    },
    createNoteListFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },
  }
});

export const NoteAction = NoteReducer.actions;

export default NoteReducer.reducer;