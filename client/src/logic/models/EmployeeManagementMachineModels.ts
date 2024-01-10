import { Employee } from "./EmployeesManagementModels.ts";

export interface EmployeeManagementMachineContext {
    work_area: string;
    employee_list: Employee[];
    current_employee: number;
    dialog_message: string;
}

export interface EmployeeManagementMachineTypes {
    context: EmployeeManagementMachineContext;
    events:
        { type: "Go Next"; } |
        { type: "Go Back" } |
        { type: "Select Employee"; } |
        { type: "Edit Employee" } |
        { type: "Edit Success"; access: string } |
        { type: "Edit Error" } |
        { type: "Go To Employee Brief" } |
        { type: "Employee Brief Error" }
}