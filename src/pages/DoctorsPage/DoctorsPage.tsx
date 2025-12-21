import React from "react";
import styles from "./DoctorsPage.module.css";

const DoctorsPage: React.FC = () => {
  return (
    <main className={styles.DoctorsPageWrap}>
      <h1 className={styles.title}>Доктора</h1>
    </main>
  );
};

export default DoctorsPage;