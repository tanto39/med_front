import React from "react";
import styles from "./PatientPage.module.css";

const PatientPage: React.FC = () => {
  return (
    <main className={styles.patientPageWrap}>
      <h1 className="heading">Пациент</h1>
      <div className={styles.patientPage}>
      </div>
    </main>
  );
};

export default PatientPage;