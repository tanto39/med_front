import React from "react";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  return (
    <main className={styles.DashboardWrap}>
      <h1 className={styles.title}>Дашборд</h1>
    </main>
  );
};

export default Dashboard;