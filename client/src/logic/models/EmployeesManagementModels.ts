export interface WorkAreaData {
    name: string;
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
    photo_link: string;
}

export interface EmployeeReinstate{
    
}

export interface EmployeeStatus{
    
}