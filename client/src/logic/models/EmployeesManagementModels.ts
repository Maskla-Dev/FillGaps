import { EmployeeState } from "./EmployeeBriefModels";

export const Departments = ['IT', 'Administrative', 'Operations', 'Collection', 'Research',
    'Education', 'Preservation', 'Security', 'External'] as const;
export type DepartmentName = typeof Departments[number];

export const Roles = ['IT Manager', 'IT Technical', 'Caretakers Manager', 'Caretaker',
    'Administrative Manager', 'Administrative', 'Operations Manager', 'Cleaning', 'Maintenance', 'Salesman',
    'Ticket Taker', 'Collection, Research & Education Manager', 'Educator', 'Tour Guide', 'Researcher',
    'Preservation Manager', 'Restorer', 'Curator', 'Idle'] as const;
export type RoleName = typeof Roles[number];

export interface WorkAreaData {
    name: DepartmentName;
    illustration: string;
    is_current?: boolean;
}

export const WorkAreasList: WorkAreaData[] = [
    {
        name: 'IT',
        illustration: "/img/Information_technology.jpg"
    },
    {
        name: 'Administrative',
        illustration: "/img/employee_management.webp"
    },
    {
        name: 'Operations',
        illustration: "/img/operations.jpg"
    },
    {
        name: 'Collection',
        illustration: "/img/collection.jfif"
    },
    {
        name: 'Research',
        illustration: "/img/research.jfif"
    },
    {
        name: 'Education',
        illustration: "/img/education.jpg"
    },
    {
        name: 'Preservation',
        illustration: "/img/preservation.webp"
    },
    {
        name: 'Security',
        illustration: "/img/security.jpg"
    },
    {
        name: 'External',
        illustration: "/img/external.webp"
    }
];

export interface Employee {
    employee_id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    photo: string;
}

export interface EmployeeStatus {
    employee_id: number;
    state: EmployeeState;
}