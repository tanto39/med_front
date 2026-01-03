import { IInputField } from "../../types/forms";

export const inputFieldsPatient: IInputField[] = [
  {
    id: "second_name",
    type: "text",
    label: "Фамилия",
    placeholder: "Фамилия",
    roles: ["admin", "patient"]
  },
  {
    id: "first_name",
    type: "text",
    label: "Имя",
    placeholder: "Имя",
    roles: ["admin", "patient"]
  },
  {
    id: "middle_name",
    type: "text",
    label: "Отчество",
    placeholder: "Отчество",
    roles: ["admin", "patient"]
  },
  {
    id: "snils",
    type: "text",
    label: "СНИЛС",
    placeholder: "152-675-139 81",
    roles: ["admin", "patient"]
  },
  {
    id: "policy_foms",
    type: "number",
    label: "Полис ФОМС",
    placeholder: "",
    roles: ["admin", "patient"]
  },
  {
    id: "phone_number",
    type: "text",
    label: "Контактный телефон",
    placeholder: "+7(920)789-55-44",
    roles: ["admin", "patient"]
  },
  {
    id: "e_mail",
    type: "text",
    label: "Электронная почта",
    placeholder: "email@mail.ru",
    roles: ["admin", "patient"]
  },
];

export const inputFieldsAmbulatory: IInputField[] = [
  {
    id: "id_ambulatory_card",
    type: "number",
    label: "Номер амбулаторной карты",
    placeholder: "00000001",
    disabled: true
  },
  {
    id: "registration_date",
    type: "date",
    label: "Дата регистрации",
    placeholder: "",
    customClassName: "inputUI__date",
    roles: ["admin", "patient"]
  },
  {
    id: "registration_date_end",
    type: "date",
    label: "Дата окончания регистрации",
    placeholder: "",
    customClassName: "inputUI__date",
    roles: ["admin", "patient"]
  }
];

export const inputFieldsPassport: IInputField[] = [
  {
    id: "passport_series",
    type: "number",
    label: "Серия паспорта",
    placeholder: "3811",
    roles: ["admin", "patient"]
  },
  {
    id: "passport_number",
    type: "number",
    label: "Номер паспорта",
    placeholder: "771771",
    roles: ["admin", "patient"]
  },
  {
    id: "given_by",
    type: "text",
    label: "Паспорт выдан",
    placeholder: "ТП УФМС России по Курской области",
    roles: ["admin", "patient"]
  },
  {
    id: "given_date",
    type: "date",
    label: "Дата выдачи паспорта",
    placeholder: "",
    customClassName: "inputUI__date",
    roles: ["admin", "patient"]
  },
];

export const inputFields = {
  patientFields: inputFieldsPatient,
  ambulatoryFields: inputFieldsAmbulatory,
  passportFields: inputFieldsPassport
};
