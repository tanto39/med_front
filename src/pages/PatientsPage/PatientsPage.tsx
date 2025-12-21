import React from "react";
import styles from "./PatientsPage.module.css";

const PatientsPage: React.FC = () => {
  return (
    <main className={styles.PatientsPageWrap}>
      <h1 className={styles.title}>Пациенты</h1>
    </main>
  );
};

export default PatientsPage;