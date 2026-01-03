import React, { useMemo } from "react";
import styles from "./InputUI.module.css";
import { UseFormRegister } from "react-hook-form";
import { IInputField } from "../../../types/forms";
import { UserRole } from "../../../types/index";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  field: IInputField;
  register?: UseFormRegister<any>;
  role?: UserRole;
}

const InputUI: React.FC<IInputProps> = ({ field, register, role, ...props }) => {
  const isFieldDisabled = useMemo(() => {
    if ( field.disabled )
      return field.disabled;

    if (!field.roles || !role) {
      return props.disabled;
    }
    return !field.roles.includes(role);
  }, [field.roles, role, props.disabled]);

  const commonProps = useMemo(() => {
    return {
      id: field.id,
      type: field.type,
      placeholder: field.placeholder,
      className: field.customClassName
        ? `${styles.inputUI__field} ${styles[field.customClassName]}`
        : styles.inputUI__field,
      "aria-label": field.placeholder,
      required: true,
      disabled: isFieldDisabled,
    };
  }, [field, isFieldDisabled]);

  return (
    <div className={styles["inputUI"]}>
      <label htmlFor={field.id} className={styles["inputUI__label"]}>
        {field.label}
      </label>
      {register ? (
        // Используем register из react-hook-form
        <input {...commonProps} {...register(field.id)} />
      ) : (
        // Используем явно переданные пропсы
        <input {...commonProps} {...props} />
      )}
    </div>
  );
};

export default InputUI;
