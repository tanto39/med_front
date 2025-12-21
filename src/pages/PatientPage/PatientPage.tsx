import React from "react";
import styles from "./PatientPage.module.css";

const PatientPage: React.FC = () => {
  return (
    <main className={styles.PatientPageWrap}>
      <h1 className={styles.title}>Пациент</h1>
    </main>
  );
};

export default PatientPage;