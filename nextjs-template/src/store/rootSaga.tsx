import { all, fork } from "redux-saga/effects";
import { authWatcher } from "./authStore/AuthSaga";
import { noteWatcher } from "./noteStore/NoteSaga";
import { cardWatcher } from "./linkcardStore/LinkCardSaga";
import { profileWatcher } from "./profileStore/ProfileSaga";

export default function* reduxSaga() {
  yield all([
    fork(authWatcher),
    fork(noteWatcher),
    fork(cardWatcher),
    fork(profileWatcher),
    // fork(exampleWatcher),
  ]);
}
