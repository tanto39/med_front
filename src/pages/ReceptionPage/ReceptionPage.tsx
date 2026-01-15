import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useDiagnoses } from "../../hooks/useDiagnoses";
import { useDoctors } from "../../hooks/useDoctors";
import { useMedicalProfiles } from "../../hooks/useMedicalProfiles";
import { usePatients } from "../../hooks/usePatients";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { fetchReception } from "../../store/slices/receptionSlice";
import { ReceptionFormData } from "../../types/forms";
import { IMessage, IUrlParam } from "../../types/index";
import styles from "./ReceptionPage.module.css";

const ReceptionPage: React.FC = () => {
  const messageSet: IMessage = {} as IMessage;

  const { reception, isLoading, error, successSend } = useAppSelector((state) => state.reception);
  const { optionsProfiles } = useMedicalProfiles();
  const { optionsPatients } = usePatients();
  const { optionsDoctors } = useDoctors();
  const { optionsDiagnoses } = useDiagnoses();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const { register, handleSubmit, getValues, setValue, watch } = useForm<ReceptionFormData>();

  const watchIdMedicalProfile = watch("id_medical_profile");
  const watchIdDoctor = watch("id_doctor");
  const watchIdPatient = watch("id_patient");

  // Инициализируем selected
  const [selectedProfile, setSelectedProfile] = useState<string | number>(
    watchIdMedicalProfile || reception?.id_medical_profile || ""
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string | number>(
    watchIdDoctor || reception?.id_doctor || ""
  );
  const [selectedPatient, setSelectedPatient] = useState<string | number>(
    watchIdPatient || reception?.id_patient || ""
  );

  useEffect(() => {
    const paramsId: number = Number(params.id);
    if (!reception?.id_reception || paramsId !== reception?.id_reception) {
      dispatch(fetchReception(paramsId));
    }
    if (reception) {
      setValue("second_name", currentDoctor.user.second_name);
      setValue("first_name", currentDoctor.user.first_name);
      currentDoctor.user.middle_name && setValue("middle_name", currentDoctor.user.middle_name);
      if (currentDoctor.medical_profile) {
        setValue("id_medical_profile", currentDoctor.medical_profile.id_medical_profile);
        setSelectedProfile(currentDoctor.medical_profile.id_medical_profile);
      }
    }
  }, [dispatch, currentDoctor, params.id]);

  // Синхронизация selectedProfile с формой
  useEffect(() => {
    if (selectedProfile) {
      setValue("id_medical_profile", selectedProfile as number);
    }
  }, [selectedProfile, setValue]);

  if (error) {
    messageSet.type = "E";
    messageSet.title = "Error";
    messageSet.message = <p>{error}</p>;
    dispatch(setMessage(messageSet));
  }

  if (successSend) {
    messageSet.type = "S";
    messageSet.title = "Сохранено";
    messageSet.message = (
      <div>
        <p>Изменения сохранены.</p>
      </div>
    );
    dispatch(clearSend());
    dispatch(setMessage(messageSet));
  }

  const onSubmit: SubmitHandler<DoctorFormData> = async (formData) => {
    const patientData: DoctorWithDetails = {
      id_doctor: currentDoctor?.id_doctor,
      login: currentDoctor?.login as string,
      user: {
        login: currentDoctor?.login as string,
        first_name: formData.first_name,
        second_name: formData.second_name,
        middle_name: formData.middle_name,
        role_name: currentDoctor?.user.role_name as UserRole,
      },
      medical_profile: {
        id_medical_profile: selectedProfile as number,
      },
      receptions: currentDoctor?.receptions
    };
    dispatch(updateDoctor({ id: currentDoctor?.id_doctor as number, data: patientData }));
  };

  return (
    <main className={styles.ReceptionPageWrap}>
      <h1 className={styles.title}>Запись на прием</h1>
    </main>
  );
};

export default ReceptionPage;