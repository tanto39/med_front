import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ReceptionShort } from "../../types/index";
import styles from "./ReceptionsItem.module.css";

interface ReceptionsProps {
  reception: ReceptionShort;
}

export const ReceptionsItem: React.FC<ReceptionsProps> = ({ reception }) => {
  const navigate = useNavigate();

  const formattedDate = useMemo(() => {
    const parts = reception.reception_date.split("-"); // ['2025', '01', '01']
    return parts[2] + "." + parts[1] + "." + parts[0];
  }, [reception]);

  return (
    <div className={styles.reception} onClick={() => navigate(`/reception/${reception.id_reception}`)}>
      {reception.doctor_info && (
        <div className={styles.doctorInfo}>
          <div className={styles.doctorName}>{reception.doctor_info.doctor_name}</div>
          <div className={styles.profile}>{reception.doctor_info.medical_profile}</div>
        </div>
      )}
      {reception.patient_info && (
        <div className={styles.patientInfo}>
          <div className={styles.patientName}>{reception.patient_info.patient_name}</div>
        </div>
      )}
      <div className={styles.dateBlock}>
        <div className={styles.date}>{formattedDate}</div>
        <div className={styles.time}>{reception.reception_time}</div>
      </div>
    </div>
  );
};
