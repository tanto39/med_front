import React, { ReactNode } from "react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../helpers";

export interface IMessage {
  type: string;
  title: string;
  message: ReactNode;
}

export interface IMessageSlice {
  message: IMessage
}

export const InitialState: IMessageSlice = {
  message: {
    type: '',
    title: '',
    message: '',
  }
};

export const setMessage = (message: IMessage) => async (dispach: AppDispatch) => {
  dispach(messageSlice.actions.setMessage(message));
};

export const messageSlice = createSlice({
  name: "message",
  initialState: InitialState,
  reducers: {
    setMessage(state, action: PayloadAction<IMessage>) {
      state.message = action.payload;
    }
  },
});

export default messageSlice.reducer;
