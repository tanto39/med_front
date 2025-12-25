import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IBoardLinks } from "../../pages/Dashboard/BoardLinks";
import { useAppSelector } from "../../store/helpers";
import styles from "./DashboardItem.module.css";

interface IDashboardItemProps {
  item: IBoardLinks;
}

export const DashboardItem: React.FC<IDashboardItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [path, setPath] = useState(item.link);
 
  useEffect(() => {
    if (path.includes(":id") && user) {
      if (user.patient?.id_patient) {
        setPath(path.replace(":id", user.patient.id_patient.toString()));
      }
      if (user.doctor?.id_doctor) {
        setPath(path.replace(":id", user.doctor.id_doctor.toString()));
      }
    }
  }, [item, user]);

  return (
    <div className={styles.dashboardItem} onClick={() => navigate(path)}>
      <img className={styles.img} src={item.img} title={item.title} alt={item.title}/>
      <div className={styles.title}><span>{item.title}</span></div>
    </div>
  );
};
