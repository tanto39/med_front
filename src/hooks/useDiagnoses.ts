import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchDiagnoses } from "../store/slices/diagnosesSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";

export function useDiagnoses() {
  const { diagnoses, optionsDiagnoses, isLoading, error } = useAppSelector((state) => state.diagnos);
  const dispatch = useAppDispatch();
   const messageSet: IMessage = {} as IMessage;

  useEffect(() => {
    if (diagnoses.length === 0) {
      dispatch(fetchDiagnoses());
    }
  }, [dispatch, diagnoses]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Ошибка";
    messageSet.message = error;
    dispatch(setMessage(messageSet));
  }

  return { diagnoses, optionsDiagnoses, isLoading, error };
}