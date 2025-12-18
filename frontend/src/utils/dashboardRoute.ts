export const getDashboardRoute = (role?: string) => {
  switch (role) {
    case "Admin":
      return "/admin-dashboard";
    case "Patient":
      return "/patient-dashboard";
    case "DepartmentMember":
      return "/department-dashboard";
    default:
      return "/login";
  }
};
