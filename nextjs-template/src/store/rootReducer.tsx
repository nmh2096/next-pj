import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./authStore/AuthReducer";
import NoteReducer from "./noteStore/NoteReducer";
import LinkCardReducer from "./linkcardStore/LinkCardReducer";
import ProfileReducer from "./profileStore/ProfileReducer";

export const rootReducer = combineReducers({
  auth: AuthReducer,
  note: NoteReducer,
  card: LinkCardReducer,
  profile: ProfileReducer,
});
