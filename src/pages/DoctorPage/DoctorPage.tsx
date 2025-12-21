import React from "react";
import styles from "./DoctorPage.module.css";

const DoctorPage: React.FC = () => {
  return (
    <main className={styles.DoctorPageWrap}>
      <h1 className={styles.title}>Доктор</h1>
    </main>
  );
};

export default DoctorPage;