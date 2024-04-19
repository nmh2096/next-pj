import { createApi, deleteNoteApi, getNoteDetailApi, getNoteListApi, updateNoteApi } from "@/services/api/noteApi";
import { Effect, all, call, put, takeLatest } from "redux-saga/effects";
import { NoteAction } from "./NoteReducer";

export function* noteWatcher() {
  yield all([
    takeLatest(NoteAction.getNoteListRequest.type, getNoteListWorker),
    takeLatest(NoteAction.createNoteListRequest.type, createNoteListWorker),
    takeLatest(NoteAction.getNoteDetailRequest.type, getNoteDetailWorker),
    takeLatest(NoteAction.updateNoteRequest.type, updateNoteWorker),
    takeLatest(NoteAction.deleteNoteRequest.type, deleteNoteWorker),

  ]);
}

function* getNoteListWorker(): Generator {
  try {
    const response: any = yield call(getNoteListApi)
    if (response.status === 200) {
      console.log(response);
      yield put(NoteAction.getNoteListSuccess(response.data));
    }
  } catch (error: any) {
    console.log(error);
    yield put(NoteAction.getNoteListFail(error.response.data.message))

  }
};

function* createNoteListWorker(action: Effect): Generator {
  try {
    const response: any = yield call(createApi, action.payload)
    if (response.status === 201) {
      yield put(NoteAction.createNoteListSuccess(response.data))

    }
  } catch (error: any) {
    yield put(NoteAction.createNoteListFail(error.response.data.message))
  }
}

function* getNoteDetailWorker(action: Effect): Generator {
  try {
    const response: any = yield call(getNoteDetailApi, action.payload._id)
    if (response.status === 200) {
      yield put(NoteAction.getNoteDetailSuccess(response.data))
    }
  } catch (error: any) {
    yield put(NoteAction.getNoteDetailFail(error.response.data.message))
  }
}

function* updateNoteWorker(action: Effect): Generator {
  try {
    const response: any = yield call(updateNoteApi, action.payload._id, action.payload)
    if (response.status === 201) {
      yield put(NoteAction.updateNoteSuccess(response.data))
    }
  } catch (error: any) {
    yield put(NoteAction.updateNoteFail(error.response.data.message))
  }
}

function* deleteNoteWorker(action: Effect): Generator {
  try {
    const response: any = yield call(deleteNoteApi, action.payload)
    if (response.status === 200) {
      yield put(NoteAction.deleteNoteSuccess(response.data))
    }
  } catch (error: any) {
    yield put(NoteAction.deleteNoteFail(error.response.data.message))
  }
}

