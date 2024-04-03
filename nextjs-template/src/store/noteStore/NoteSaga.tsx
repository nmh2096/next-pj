import { createApi, getNoteListApi } from "@/services/api/noteApi";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { NoteAction } from "./NoteReducer";

export function* noteWatcher() {
  yield all([
    takeLatest(NoteAction.getNoteListRequest.type, getNoteListWorker),
    takeLatest(NoteAction.createNoteListRequest.type, createNoteListWorker),
    // takeLatest(NoteAction.updateRequest.type, updateWorker),
    // takeLatest(NoteAction.deleteRequest.type, deleteWorker),

  ]);
}

function* getNoteListWorker(): Generator {
  try {
    const response: any = yield call(getNoteListApi)
    if (response.status === 200) {
      console.log(response);
      yield put (NoteAction.getNoteListSuccess(response.data));
    }
  } catch (error: any) {
    yield put(NoteAction.getNoteListFail(error.response.data.message))
    console.log(error);

  }
};

function* createNoteListWorker(action: any): Generator {
  try {
    const response: any = yield call(createApi, action.payload)
    if (response.status === 201) {
      yield put(NoteAction.createNoteListSuccess(response.data.message))
      console.log(response)
    }
  } catch (error: any) {
    yield put(NoteAction.createNoteListFail(error.response.data.message))
  }
}

