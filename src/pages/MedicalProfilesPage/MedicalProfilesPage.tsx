import React from "react";
import styles from "./MedicalProfilesPage.module.css";

const MedicalProfilesPage: React.FC = () => {
  return (
    <main className={styles.MedicalProfilesPageWrap}>
      <h1 className={styles.title}>Медицинские профили</h1>
    </main>
  );
};

export default MedicalProfilesPage;