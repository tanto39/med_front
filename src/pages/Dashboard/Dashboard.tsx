import React from "react";
import { DashboardItem } from "../../components/DashboardItem/DashboardItem";
import { useAppSelector } from "../../store/helpers";
import { UserRole } from "../../types/index";
import { boardLinks } from "./BoardLinks";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <main className="pageWrap">
      <h1 className="heading">Медицинская информационная система</h1>
      <div className={styles.dashboardItems}>
        {user &&
          boardLinks
            .filter((board) => board.roles.includes(user.role_name as UserRole))
            .map((board, index) => {
              let path = board.link;
              if (path.includes(":id")) {
                if (user.patient?.id_patient) {
                  path = path.replace(":id", user.patient.id_patient.toString());
                }
                if (user.doctor?.id_doctor) {
                  path = path.replace(":id", user.doctor.id_doctor.toString());
                }
              }
              return <DashboardItem key={board.title} item={board} />;
            })}
      </div>
    </main>
  );
};

export default Dashboard;
