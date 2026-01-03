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
import { clearSend, fetchPatient, updatePatient } from "../../store/slices/patientSlice";
import { PatientWithDetails } from "../../types/api";
import { PatientFormData } from "../../types/forms";
import { IMessage, IUrlParam, UserRole } from "../../types/index";
import { inputFields } from "./inputFields";
import styles from "./PatientPage.module.css";

const PatientPage: React.FC = () => {
  const navigate = useNavigate();
  const messageSet: IMessage = {} as IMessage;

  const { currentPatient, isLoading, error, successSend } = useAppSelector((state) => state.patient);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const params = useParams<IUrlParam>();

  const { register, handleSubmit, getValues, setValue } = useForm<PatientFormData>();

  useEffect(() => {
    const paramsId: number = Number(params.id);
    if (!currentPatient?.id_patient || paramsId !== currentPatient?.id_patient) {
      dispatch(fetchPatient(paramsId));
    }
    if (currentPatient) {
      setValue("second_name", currentPatient.user.second_name);
      setValue("first_name", currentPatient.user.first_name);
      currentPatient.user.middle_name && setValue("middle_name", currentPatient.user.middle_name);
      currentPatient.snils && setValue("snils", currentPatient.snils);
      currentPatient.policy_foms && setValue("policy_foms", currentPatient.policy_foms);
      currentPatient.phone_number && setValue("phone_number", currentPatient.phone_number);
      currentPatient.e_mail && setValue("e_mail", currentPatient.e_mail);

      if (currentPatient.ambulatory_card) {
        Object.entries(currentPatient.ambulatory_card).forEach(([fieldName, fieldValue]) => {
          setValue(fieldName as keyof PatientFormData, fieldValue);
        });
      }

      if (currentPatient.passport) {
        Object.entries(currentPatient.passport).forEach(([fieldName, fieldValue]) => {
          setValue(fieldName as keyof PatientFormData, fieldValue);
        });
      }
    }
  }, [dispatch, currentPatient, params.id]);

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
      <div><p>Изменения сохранены.</p></div>
    );
    dispatch(clearSend());
    dispatch(setMessage(messageSet));
  }

  const onSubmit: SubmitHandler<PatientFormData> = async (formData) => {
    const patientData: PatientWithDetails = {
      id_patient: currentPatient?.id_patient,
      login: currentPatient?.login,
      snils: formData.snils,
      policy_foms: formData.policy_foms,
      phone_number: formData.phone_number,
      e_mail: formData.e_mail,
      user: {
        login: currentPatient?.login as string,
        first_name: formData.first_name,
        second_name: formData.second_name,
        middle_name: formData.middle_name,
        role_name: currentPatient?.user.role_name as UserRole,
      },
      ambulatory_card: {
        id_ambulatory_card: formData.id_ambulatory_card,
        registration_date: formData.registration_date,
        registration_date_end: formData.registration_date_end,
        id_patient: currentPatient?.id_patient as number,
      },
      passport: {
        id_passport: formData.id_passport,
        passport_series: formData.passport_series,
        passport_number: formData.passport_number,
        given_by: formData.given_by,
        given_date: formData.given_date,
        id_patient: currentPatient?.id_patient as number,
      },
    };
    dispatch(updatePatient({ id: currentPatient?.id_patient as number, data: patientData }));
  };

  return (
    <main className={styles.patientPageWrap}>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      {currentPatient && (
        <div className={styles.patientPageCenter}>
          <h1 className="heading">
            {currentPatient.user.second_name} {currentPatient.user.first_name} {currentPatient.user.middle_name}
          </h1>
          <div className={styles.patientPage}>
            <div className={`contentBlock ${styles.formWrap}`}>
              <form className={styles.form}>
                {inputFields.patientFields.map((field) => (
                  <InputUI key={field.id} field={field} register={register} role={user?.role_name}/>
                ))}
                <div className={styles.formBlock}>
                  {inputFields.ambulatoryFields.map((field) => (
                    <InputUI key={field.id} field={field} register={register} role={user?.role_name}/>
                  ))}
                </div>
                <div className={styles.formBlock}>
                  {inputFields.passportFields.map((field) => (
                    <InputUI key={field.id} field={field} register={register} role={user?.role_name}/>
                  ))}
                </div>

                <input type="hidden" id="id_passport" {...register("id_passport")} />
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

            { currentPatient.receptions && <Receptions receptions={currentPatient.receptions}/> }
          </div>
        </div>
      )}
    </main>
  );
};

export default PatientPage;
