import { createSlice } from "@reduxjs/toolkit";
import { ICardStore } from "./interface"

const initialState: ICardStore = {
  loading: false,
  message: "",
  success: false,
  cardList: [],
  card: null,
};

const CardReducer = createSlice({
  name: "card",
  initialState,
  reducers: {

    /**Get Linkcard */
    getCardListRequest(state) {
      state.loading = true;
    },
    getCardListSuccess(state, action) {
      state.loading = false;
      state.cardList = action.payload.linkcards;
      state.success = true;
    },
    getCardListFail(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.success = false;
    },

    /**Create Card */

    createCardListRequest(state, _) {
      state.loading = true;
    },
    createCardListSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.cardList.push(action.payload.linkcard);
    },
    createCardListFail(state, action) {
      state.loading = false;
      state.message = action.payload;
    },

    /**Id Card */

    getCardDetailRequest(state, _) {
      state.loading = true;
      state.card = null;
    },
    getCardDetailSuccess(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.card = action.payload.linkcard;
    },
    getCardDetailFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.card = null;
    },

    /**Update Card */
    updateCardRequest(state, _) {
      state.loading = true;

    },
    updateCardSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.message = action.payload.message;
      state.cardList = state.cardList.map((card) => {
        if (card._id === action.payload.linkcard._id) {
          return action.payload.linkcard;
        } else {
          return card;
        }
      })
    },
    updateCardFail(state, action) {
      state.loading = false;
      state.success = false;
      state.message = action.payload.message;
      state.card = null;
    },

  }
})

export const CardAction = CardReducer.actions;

export default CardReducer.reducer;