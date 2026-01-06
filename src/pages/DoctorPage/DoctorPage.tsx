import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Receptions } from "../../components/Receptions/Receptions";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import InputUI from "../../components/UI/InputUI/InputUI";
import Loader from "../../components/UI/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { setMessage } from "../../store/slices/message";
import { clearSend, fetchDoctor, updateDoctor } from "../../store/slices/doctorSlice";
import { DoctorWithDetails } from "../../types/api";
import { DoctorFormData } from "../../types/forms";
import { IMessage, IUrlParam, UserRole } from "../../types/index";
import { inputFields } from "./inputFields";
import styles from "./DoctorPage.module.css";
import SelectUI from "../../components/UI/SelectUI/SelectUI";
import { useMedicalProfiles } from "../../hooks/useMedicalProfiles";

const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();
  const messageSet: IMessage = {} as IMessage;

  const { currentDoctor, isLoading, error, successSend } = useAppSelector((state) => state.doctor);
  const { optionsProfiles } = useMedicalProfiles();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const { register, handleSubmit, getValues, setValue, watch } = useForm<DoctorFormData>();

  // Получаем значение id_medical_profile из формы
  const watchIdMedicalProfile = watch("id_medical_profile");

  // Инициализируем selectedProfile из формы или из currentDoctor
  const [selectedProfile, setSelectedProfile] = useState<string | number>(
    watchIdMedicalProfile || currentDoctor?.medical_profile?.id_medical_profile || ""
  );

  useEffect(() => {
    const paramsId: number = Number(params.id);
    if (!currentDoctor?.id_doctor || paramsId !== currentDoctor?.id_doctor) {
      dispatch(fetchDoctor(paramsId));
    }
    if (currentDoctor) {
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
    <main className={styles.doctorPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {currentDoctor && (
        <div className="pageWrap">
          <h1 className="heading">
            {currentDoctor.user.second_name} {currentDoctor.user.first_name} {currentDoctor.user.middle_name}
          </h1>
          <div className={`contentBlock ${styles.formWrap}`}>
            <form className={styles.form}>
              {inputFields.map((field) => (
                <InputUI key={field.id} field={field} register={register} role={user?.role_name} />
              ))}

              <SelectUI
                options={optionsProfiles}
                value={selectedProfile}
                onChange={setSelectedProfile}
                placeholder="Выберите медицинский профиль"
                searchPlaceholder="Поиск медицинского профиля..."
                label="Медицинский профиль"
              />

              <div className={styles.saveButton}>
                <ButtonUI type="button" onClick={handleSubmit(onSubmit)}>
                  Сохранить
                </ButtonUI>
              </div>
            </form>
            <div className={styles.rightSide}>
              <ButtonUI type="button" onClick={() => navigate("/reception/0")}>
                Запись на прием
              </ButtonUI>
            </div>
          </div>

          {currentDoctor.receptions && <Receptions receptions={currentDoctor.receptions} />}
        </div>
      )}
    </main>
  );
};

export default DoctorsPage;
