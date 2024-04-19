import { Effect, all, call, put, takeLatest } from "redux-saga/effects";
import { AuthAction } from "./AuthReducer";
import { loginApi, registerApi } from "@/services/api/authApi";
import { setLocal } from "@/utils";
import { authApi, profileUpdateApi } from "@/services/api/profileApi";

export function* authWatcher() {
  yield all([
    takeLatest(AuthAction.loginRequest.type, loginWorker),
    takeLatest(AuthAction.registerRequest.type, registerWorker),
    takeLatest(AuthAction.getAuthRequest.type, authWorker),
    takeLatest(AuthAction.getProfileRequest.type, getProfileWorker),
  ]);
}

function* loginWorker(action: Effect): Generator {
  try {
    const response: any = yield call(loginApi, action.payload);
    if (response.status === 200) {
      yield put(AuthAction.loginSuccess(response.data.message))
      setLocal("token", response.data.accessToken);

      console.log(response)
    }
  } catch (error: any) {
    yield put(AuthAction.loginFail(error.response.data.message))
  }
}

function* registerWorker(action: Effect): Generator {
  try {
    const response: any = yield call(registerApi, action.payload);
    console.log(response);
    
    if (response.status === 201) {
      yield put(AuthAction.registerSuccess(response.data.message))
      console.log(response);

    }
  } catch (error: any) {
    console.log(error);
    yield put(AuthAction.registerFail(error.response.data.message))
  }
}

function* authWorker(): Generator {
  try {
    const response: any = yield call(authApi);
    if (response.status === 200) {
      yield put(AuthAction.getAuthSuccess(response.data))
      // setLocal("token", response.data.accessToken);
      console.log(response)
    }
  } catch (error: any) {
    console.log(error);
    yield put(AuthAction.getAuthFail(error.response.data.message))
  }
}

function* getProfileWorker(action:Effect): Generator {
  try {
    console.log(action);
    
    const response: any = yield call(profileUpdateApi, action.payload._id, action.payload )
    
    
    if(response.status === 201) {
      yield put(AuthAction.getProfileSuccess(response.data))
      console.log(response);
    }
  } catch (error:any) {
    yield put(AuthAction.getProfileFail(error.response.data.message))
  }
}