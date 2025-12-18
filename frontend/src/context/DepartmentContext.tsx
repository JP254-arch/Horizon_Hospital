import { createContext, useContext, type ReactNode } from "react";
import { useUserContext } from "./UserContext";

import type { Department } from "./departmentData"; // ✅ import type only
import { departments as allDepartments } from "./departmentData";

// Context type
interface DepartmentContextType {
  department: Department | null;       // for department member
  departments: Department[];          // for admin
}

// Create context
const DepartmentContext = createContext<DepartmentContextType>({
  department: null,
  departments: [],
});

// Provider
export const DepartmentProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUserContext();

  // Department for the logged-in user
  const department = allDepartments.find(d => d.id === user?.departmentId) || null;

  return (
    <DepartmentContext.Provider value={{ department, departments: allDepartments }}>
      {children}
    </DepartmentContext.Provider>
  );
};

// Hook to get department member
export const useDepartment = () => {
  const context = useContext(DepartmentContext);
  return context.department;
};

// Hook to get all departments (for admin)
export const useDepartments = () => {
  const context = useContext(DepartmentContext);
  return { departments: context.departments };
};
