// src/context/DepartmentContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


export interface Department {
  id: string;
  name: string;
  isActive: boolean;
}

interface DepartmentContextType {
  departments: Department[];
  toggleDepartmentStatus: (id: string) => void;
}

const DepartmentContext = createContext<DepartmentContextType | undefined>(undefined);

// Initial departments
const initialDepartments: Department[] = [
  { id: "dep_admin", name: "Administration", isActive: true },
  { id: "dep_front_office", name: "Front Office", isActive: true },
];

export function DepartmentProvider({ children }: { children: ReactNode }) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  // Toggle department active/inactive status
  const toggleDepartmentStatus = (id: string) => {
    setDepartments(prev =>
      prev.map(d => (d.id === id ? { ...d, isActive: !d.isActive } : d))
    );
  };

  return (
    <DepartmentContext.Provider value={{ departments, toggleDepartmentStatus }}>
      {children}
    </DepartmentContext.Provider>
  );
}

// Hook to consume the department context
export function useDepartments() {
  const ctx = useContext(DepartmentContext);
  if (!ctx) throw new Error("useDepartments must be used within DepartmentProvider");
  return ctx;
}
