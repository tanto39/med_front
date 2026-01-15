import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchDoctors } from "../store/slices/doctorsSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";

export function useDoctors() {
  const { doctors, optionsDoctors, isLoading, error } = useAppSelector((state) => state.doctors);
  const dispatch = useAppDispatch();
   const messageSet: IMessage = {} as IMessage;

  useEffect(() => {
    if (doctors.length === 0) {
      dispatch(fetchDoctors());
    }
  }, [dispatch, doctors]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Ошибка";
    messageSet.message = error;
    dispatch(setMessage(messageSet));
  }

  return { doctors, optionsDoctors, isLoading, error };
}