import React from "react";
import { UserRole } from "../../types/index";

export interface INavLinks {
  link: string;
  title: string;
  roles: UserRole[];
}

export const navLinks: INavLinks[] = [
  { link: "/", title: "Главная", roles: ["patient", "doctor", "admin"] },
  { link: "/patients/:id", title: "Электронная карта", roles: ["patient"] },
  { link: "/doctors/:id", title: "Кабинет врача", roles: ["doctor"] },
  { link: "/medical_profiles", title: "Лечебные профили", roles: ["patient", "doctor", "admin"] },
  { link: "/doctors", title: "Врачи", roles: ["patient", "doctor", "admin"] },
  { link: "/reception", title: "Запись на прием", roles: ["patient"] },
];
