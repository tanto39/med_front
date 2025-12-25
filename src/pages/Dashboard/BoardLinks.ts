import React from "react";
import { UserRole } from "../../types/index";

export interface IBoardLinks {
  link: string;
  title: string;
  img: string;
  roles: UserRole[];
}

export const boardLinks: IBoardLinks[] = [
  { link: "/patients/:id", title: "Электронная карта", img: "/images/karta.jpg", roles: ["patient"] },
  { link: "/doctors/:id", title: "Кабинет врача", img: "/images/karta.jpg", roles: ["doctor"] },
  { link: "/medical_profiles", title: "Лечебные профили", img: "/images/karta.jpg", roles: ["patient", "doctor", "admin"] },
  { link: "/doctors", title: "Врачи", img: "/images/karta.jpg", roles: ["patient", "doctor", "admin"] },
  { link: "/reception", title: "Запись на прием", img: "/images/karta.jpg", roles: ["patient"] },
];
