import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { IMessage, setMessage } from "../../store/slices/message";
import { useForm } from "react-hook-form";
import styles from "./LoginPage.module.css";
import { IInputField, LoginFormData } from "../../types/index";
import Loader from "../../components/UI/Loader/Loader";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import { useNavigate } from "react-router-dom";
import InputUI from "../../components/UI/InputUI/InputUI";
import { sendAuth, sendRegister } from "../../store/slices/authSlice";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  // Если пользователь уже авторизован, перенаправляем на главную
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (error) {
      messageSet.type = "E";
      messageSet.title = "Error";
      messageSet.message = <p>{error}</p>;
      dispatch(setMessage(messageSet));
    }
  }, [user, navigate, error, dispatch]);

  const { register, handleSubmit, getValues } = useForm<LoginFormData>();
  const messageSet: IMessage = {} as IMessage;

  const onSubmitAuth = async () => {
    const data = getValues();
    dispatch(sendAuth(data));
  };

  const onSubmitRegister = async () => {
    const data = getValues();
    dispatch(sendRegister(data));
  };

  const inputFields: IInputField[] = [
    { id: "login", type: "text", placeholder: "Логин" },
    { id: "password", type: "password", placeholder: "Пароль" },
  ];

  return (
    <main className={styles.LoginPageWrap}>
      <h1 className={styles.title}>Авторизация</h1>

      <form className={styles.form}>
        <div className={styles.formInputs}>
          {inputFields.map((field) => (
            <InputUI key={field.id} field={field} register={register} />
          ))}
        </div>

        <div className={styles.buttonsContainer}>
          <ButtonUI type="button" onClick={handleSubmit(onSubmitAuth)}>
            Авторизация
          </ButtonUI>

          <ButtonUI type="button" btnClass="btnGreen" onClick={handleSubmit(onSubmitRegister)}>
            Регистрация
          </ButtonUI>
        </div>
      </form>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
    </main>
  );
};

export default LoginPage;
