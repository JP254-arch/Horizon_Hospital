// src/context/departmentConstants.ts
import type { Department } from "./DepartmentContext";

export const initialDepartments: Department[] = [
  { id: "dep_admin", name: "Administration", isActive: true },
  { id: "dep_front_office", name: "Front Office", isActive: true },
];
