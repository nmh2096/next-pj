import { createApi, getNoteListApi } from "@/services/api/noteApi";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { NoteAction } from "./NoteReducer";

export function* noteWatcher() {
  yield all([
    takeLatest(NoteAction.getNoteListRequest.type, getNoteListWorker),
    takeLatest(NoteAction.createRequest.type, createWorker),
    // takeLatest(NoteAction.updateRequest.type, updateWorker),
    // takeLatest(NoteAction.deleteRequest.type, deleteWorker),

  ]);
}

function* getNoteListWorker(): Generator {
  try {
    const response: any = yield call(getNoteListApi)
    if (response.status === 200) {
      console.log(response);
    }
  } catch (error: any) {
    // yield put(NoteAction.createFail(error.response.data.message))
    console.log(error);

  }
};

function* createWorker(action: any): Generator {
  try {
    const response: any = yield call(createApi, action.payload)
    if (response.status === 200) {
      yield put(NoteAction.createSuccess(response.data.message))
      localStorage.setItem("token", response.data.accessToken);
      console.log(response)
    }
  } catch (error: any) {
    yield put(NoteAction.createFail(error.response.data.message))
  }
}

