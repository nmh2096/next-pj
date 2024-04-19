import { createCardApi, getCardDetailApi, getCardListApi, updateCardApi } from "@/services/api/cardApi";
import { Effect, all, call, put, takeLatest } from "redux-saga/effects";
import { CardAction } from "./LinkCardReducer";

export function* cardWatcher() {
  yield all([
    takeLatest(CardAction.getCardListRequest.type, getCardListWorker),
    takeLatest(CardAction.createCardListRequest.type, createCardListWorker),
    takeLatest(CardAction.getCardDetailRequest.type, getCardDetailWorker),
    takeLatest(CardAction.updateCardRequest.type, updateCardWorker),
    
  ])
}

function* getCardListWorker(): Generator {
  try {
    const response: any = yield call(getCardListApi)
    if (response.status === 200) {
      console.log(response);
      yield put(CardAction.getCardListSuccess(response.data));
    }
  } catch (error: any) {
    yield put(CardAction.getCardListFail(error.response.data.message))
  }
};

function* createCardListWorker(action: Effect): Generator {
  try {
    const response: any = yield call(createCardApi, action.payload)
    if (response.status === 201) {
      console.log(response);
      yield put(CardAction.createCardListSuccess(response.data));
    }
  } catch (error: any) {
    yield put(CardAction.createCardListFail(error.response.data.message))
  }
};

function* getCardDetailWorker(action: Effect): Generator {
  try {
    const response: any = yield call(getCardDetailApi, action.payload._id)
    if (response.status === 200) {
      console.log(response);
      yield put(CardAction.getCardDetailSuccess(response.data));
    }
  } catch (error: any) {
    yield put(CardAction.getCardDetailFail(error.response.data.message))
  }
};

function* updateCardWorker(action: Effect): Generator {
  try {
    const response: any = yield call(updateCardApi, action.payload._id, action.payload)
    if (response.status === 201) {
      console.log(response);
      yield put(CardAction.updateCardSuccess(response.data));
    }
  } catch (error: any) {
    yield put(CardAction.updateCardFail(error.response.data.message))
  }
};
