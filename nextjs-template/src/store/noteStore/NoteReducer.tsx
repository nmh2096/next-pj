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

    /**Get Note */
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

    /**Create Note */

    createNoteListRequest(state, _) {
      state.loading = true;
    },
    createNoteListSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.noteList.push(action.payload.note);
    },
    createNoteListFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    /**Id Note */

    getNoteDetailRequest(state, _) {
      state.loading = true;
      state.note = null;
    },
    getNoteDetailSuccess(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.note = action.payload.note;
    },
    getNoteDetailFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.note = null;
    },

    /**Update Note */
    updateNoteRequest(state, _) {
      state.loading = true;

    },
    updateNoteSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.noteList = state.noteList.map((note) => {
        if (note._id === action.payload.note._id) {
          return action.payload.note;
        } else {
          return note;
        }
      })
    },
    updateNoteFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.note = null;
    },

    /**Delete Note */
    deleteNoteRequest(state, _) {
      state.loading = true;
    },
    deleteNoteSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.noteList = state.noteList.filter((note) => note._id !== action.payload.note._id);
    },
    deleteNoteFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.note = null;
    },
  }
});

export const NoteAction = NoteReducer.actions;

export default NoteReducer.reducer;