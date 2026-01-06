import React from "react";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import Loader from "../../components/UI/Loader/Loader";
import { useMedicalProfiles } from "../../hooks/useMedicalProfiles";
import styles from "./MedicalProfilesPage.module.css";

const MedicalProfilesPage: React.FC = () => {
  const { profiles, isLoading, error } = useMedicalProfiles();

  return (
    <main className={styles.MedicalProfilesPageWrap}>
      <h1 className={styles.title}>Медицинские профили</h1>
      {isLoading ? <Loader /> : profiles.length > 0 ? <div></div> : error && <ErrorBlock error={error} />}
    </main>
  );
};

export default MedicalProfilesPage;
