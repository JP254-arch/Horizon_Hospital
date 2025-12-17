// src/context/departmentData.ts
export interface Department {
  id: string;
  name: string;
  isActive: boolean;
}

export const initialDepartments: Department[] = [
  { id: "dep_admin", name: "Administration", isActive: true },
  { id: "dep_front_office", name: "Front Office", isActive: true },
  { id: "dep_cardiology", name: "Cardiology", isActive: true },
];
