import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/helpers";
import { fetchMedicalProfiles } from "../store/slices/medicalProfileSlice";
import { setMessage } from "../store/slices/message";
import { IMessage } from "../types/index";

export function useMedicalProfiles() {
  const { profiles, optionsProfiles, isLoading, error } = useAppSelector((state) => state.medicalProfile);
  const dispatch = useAppDispatch();
   const messageSet: IMessage = {} as IMessage;

  useEffect(() => {
    if (profiles.length === 0) {
      dispatch(fetchMedicalProfiles());
    }
  }, [dispatch, profiles]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Ошибка";
    messageSet.message = error;
    dispatch(setMessage(messageSet));
  }

  return { profiles, optionsProfiles, isLoading, error };
}