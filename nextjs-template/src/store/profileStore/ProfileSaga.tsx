import { all, call, put, takeLatest } from "redux-saga/effects"
import { ProfileAction } from "./ProfileReducer";
import { profileUpdateApi } from "@/services/api/profileApi";

export function* profileWatcher() {
  yield all ([
    takeLatest(ProfileAction.getProfileListRequest.type, getProfileListWorker),
  ]);
}

function* getProfileListWorker(action:any): Generator {
  try {
    const response: any = yield call(profileUpdateApi, action.payload._id, action.payload )
    if(response.status === 201) {
      yield put(ProfileAction.getProfileListSuccess(response.data))
    }
  } catch (error:any) {
    yield put(ProfileAction.getProfileListFail(error.response.data.message))
  }
}