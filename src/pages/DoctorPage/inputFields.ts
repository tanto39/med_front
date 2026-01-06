import { IInputField } from "../../types/forms";

export const inputFields: IInputField[] = [
  {
    id: "second_name",
    type: "text",
    label: "Фамилия",
    placeholder: "Фамилия",
    roles: ["admin", "doctor"]
  },
  {
    id: "first_name",
    type: "text",
    label: "Имя",
    placeholder: "Имя",
    roles: ["admin", "doctor"]
  },
  {
    id: "middle_name",
    type: "text",
    label: "Отчество",
    placeholder: "Отчество",
    roles: ["admin", "doctor"]
  },
];
