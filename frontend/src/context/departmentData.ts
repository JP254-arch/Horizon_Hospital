// department types and mock data
export interface Department {
  id: string;
  name: string;
  head: string;
  membersCount: number;
  features: {
    approvals: boolean;
    tasks: boolean;
    notifications: boolean;
  };
}

export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    head: "Dr. Jane Smith",
    membersCount: 15,
    features: {
      approvals: true,
      tasks: true,
      notifications: true,
    },
  },
  {
    id: "radiology",
    name: "Radiology",
    head: "Dr. Mark Allen",
    membersCount: 10,
    features: {
      approvals: false,
      tasks: true,
      notifications: true,
    },
  },
];
