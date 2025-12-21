import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/helpers";
import { logout } from "../../store/slices/authSlice";
import ButtonUI from "../UI/ButtonUI/ButtonUI";
import styles from "./TopMenu.module.css";

export const TopMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={styles.TopMenuWrap}>
      <ButtonUI type="button" btnClass="btnGreen" onClick={() => handleLogout()}>
        Выйти
      </ButtonUI>
    </div>
  );
};
