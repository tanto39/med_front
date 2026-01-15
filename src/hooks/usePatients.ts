import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchPatients } from "../store/slices/patientsSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";

export function usePatients() {
  const { patients, optionsPatients, isLoading, error } = useAppSelector((state) => state.patients);
  const dispatch = useAppDispatch();
   const messageSet: IMessage = {} as IMessage;

  useEffect(() => {
    if (patients.length === 0) {
      dispatch(fetchPatients());
    }
  }, [dispatch, patients]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Ошибка";
    messageSet.message = error;
    dispatch(setMessage(messageSet));
  }

  return { patients, optionsPatients, isLoading, error };
}