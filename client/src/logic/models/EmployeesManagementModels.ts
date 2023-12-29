export const Departments = ['IT', 'Administrative', 'Operations', 'Collection', 'Research',
    'Education', 'Preservation', 'Security', 'External'] as const;
export type DepartmentName = typeof Departments[number];

export const Roles = ['IT Manager', 'IT Technical', 'Caretakers Manager', 'Caretaker',
    'Administrative Manager', 'Administrative', 'Operations Manager', 'Cleaning', 'Maintenance', 'Salesman',
    'Ticket Taker', 'Collection, Research & Education Manager', 'Educator', 'Tour Guide', 'Researcher',
    'Preservation Manager', 'Restorer', 'Curator', 'Idle'] as const;
export type RoleName = typeof Roles[number];

export const EmployeeStates = ['Active', 'Inactive', "In Holidays", "Maternity", "Paternity", "Sick"] as const;
export type EmployeeState = typeof EmployeeStates[number];

export interface WorkAreaData {
    name: DepartmentName;
    illustration: string;
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

export interface EmployeeBrief {
    employee_id: number;
    name: string;
    email: string;
    role: string;
    department: string;
    photo: string;
}

export interface Employee extends EmployeeBrief {

}

export interface EmployeeData {

}

export interface EmployeeReinstate {

}

export interface EmployeeStatus {
    employee_id: number;
    state: EmployeeState;
}