import React from "react";
import { ReceptionShort } from "../../types/index";
import { ReceptionsItem } from "../ReceptionsItem/ReceptionsItem";
import styles from "./Receptions.module.css";

interface ReceptionsProps {
  receptions: ReceptionShort[];
}

export const Receptions: React.FC<ReceptionsProps> = ({ receptions }) => {
  return (
    <div>
      <h2 className="heading">Список приемов</h2>
      <div className={styles.receptions}>
        {receptions.map((reception) => (
          <ReceptionsItem reception={reception}/>
        ))}
      </div>
    </div>
  );
};
