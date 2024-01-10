import { Employee } from "./EmployeesManagementModels";

export const EmployeeStates = ['Active', "Disability Leave", "Parental Leave", "Temporal Leave", "Dismissal", "Resignation", "Medical Leave"] as const;
export type EmployeeState = typeof EmployeeStates[number];

export interface EmployeeBrief extends Employee {
    state: EmployeeState;
    since: string;
    init_journey: string;
    end_journey: string;
}

export interface EmployeeBase {
    tax_receipt: string | ArrayBuffer | null;
    medical_insurance_acknowledgement: string | ArrayBuffer | null;
    bank_page: string;
}

export interface DisabilityLeave extends EmployeeBase {
    settlement_receipt: string | ArrayBuffer | null;
    disability_certificate: string | ArrayBuffer | null;
}

export interface ParentalLeave extends EmployeeBase {
    birth_certificate: string | ArrayBuffer | null;
    marriage_certificate: string | ArrayBuffer | null;
}

export interface TemporalLeave extends EmployeeBase {
    signed_permit: string | ArrayBuffer | null;
    until: Date;
}

export interface EmployeeDismissal {
    settlement_receipt: string | ArrayBuffer | null;
    description: string;
    extras: string | ArrayBuffer | null;
}

export interface EmployeeResignation {
    settlement_receipt: string | ArrayBuffer | null;
    resignation_letter: string | ArrayBuffer | null;
    description: string;
}

export interface EmployeeReinstate extends EmployeeBase {
    bank_account: string;
}