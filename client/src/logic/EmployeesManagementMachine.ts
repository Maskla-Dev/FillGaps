import { createMachine } from "xstate";

export const EmployeesManagementMachine = createMachine(
    {
        id: "EmployeesManagementMachine",
        initial: "Employees",
        states: {
            "Employees": {
                always: {
                    target: "Work Areas",
                },
            },
            "Work Areas": {
                on: {
                    "Go Next": {
                        target: "Get Employees List",
                    },
                },
            },
            "Get Employees List": {
                invoke: {
                    src: "getEmployeeList",
                    id: "invoke-tk7hp",
                    onDone: [
                        {
                            target: "Employees List",
                            guard: "onDone",
                        },
                        {
                            target: "Employee List Error",
                            guard: "onError",
                        },
                    ],
                },
            },
            "Employees List": {
                on: {
                    "Go New Employee": {
                        target: "New Employee",
                    },
                    "Go to Edit Employee": {
                        target: "Get Employee Data",
                    },
                    "Go to Get Employee Brief": {
                        target: "Get Employee Brief",
                    },
                },
            },
            "Employee List Error": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Employees List",
                        actions: [],
                    },
                },
            },
            "New Employee": {
                on: {
                    "Cancel": {
                        target: "Cancel",
                    },
                    "Save Employee": {
                        target: "Confirm Save",
                    },
                },
            },
            "Get Employee Data": {
                invoke: {
                    src: "getEmployeData",
                    id: "invoke-i01w7",
                    onDone: [
                        {
                            target: "Edit Employee",
                            guard: "onDone",
                        },
                        {
                            target: "Get employee data Error",
                            guard: "onError",
                        },
                    ],
                },
            },
            "Get Employee Brief": {
                invoke: {
                    src: "getEmployeeBrief",
                    id: "invoke-1g426",
                    onDone: [
                        {
                            target: "Employee Brief",
                            guard: "onDone",
                        },
                        {
                            target: "Employee Brief Error",
                            guard: "onError",
                        },
                    ],
                },
            },
            "Cancel": {
                on: {
                    "Go Back": {
                        target: "Employees List",
                    },
                },
            },
            "Confirm Save": {
                on: {
                    Cancel: {
                        target: "New Employee",
                    },
                    Save: {
                        target: "Save Employee",
                    },
                },
            },
            "Edit Employee": {
                on: {
                    "Go Back": {
                        target: "Cancel Edit Employee",
                    },
                    "Save Edit": {
                        target: "Confirm save",
                    },
                },
            },
            "Get employee data Error": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Employees List",
                        actions: [],
                    },
                },
            },
            "Employee Brief": {
                always: [
                    {
                        target: "Active Employee",
                        guard: "isActive",
                    },
                    {
                        target: "Inactive Employee",
                    },
                ],
                on: {
                    Prev: {
                        target: "Employees List",
                    },
                },
            },
            "Employee Brief Error": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Employees List",
                        actions: [],
                    },
                },
            },
            "Save Employee": {
                invoke: {
                    src: "saveEmployeedata",
                    id: "invoke-hbdl0",
                    onDone: [
                        {
                            target: "Success Save",
                            guard: "onDone",
                        },
                        {
                            target: "New Employee",
                            guard: "onError",
                        },
                    ],
                },
            },
            "Cancel Edit Employee": {
                on: {
                    Ok: {
                        target: "Employees List",
                    },
                    Cancel: {
                        target: "Edit Employee",
                    },
                },
            },
            "Confirm save": {
                on: {
                    Cancel: {
                        target: "Edit Employee",
                    },
                    Ok: {
                        target: "Save EmployeeChanges",
                    },
                },
            },
            "Active Employee": {
                on: {
                    "Go to change status": {
                        target: "Change Employee Status Advice",
                    },
                },
            },
            "Inactive Employee": {
                on: {
                    reinstate: {
                        target: "Reinstate Employee",
                    },
                },
            },
            "Success Save": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Employees List",
                        actions: [],
                    },
                },
            },
            "Save EmployeeChanges": {
                invoke: {
                    src: "saveEmployeeData",
                    id: "invoke-w52tp",
                    onDone: [
                        {
                            target: "Success Edit",
                            guard: "onDone",
                        },
                        {
                            target: "Edit Employee",
                            guard: "onError",
                        },
                    ],
                },
            },
            "Change Employee Status Advice": {
                on: {
                    Cancel: {
                        target: "Active Employee",
                    },
                    Ok: {
                        target: "Change Employee Status",
                    },
                },
            },
            "Reinstate Employee": {
                on: {
                    Cancel: {
                        target: "Inactive Employee",
                    },
                    Save: {
                        target: "Reinstate confirm",
                    },
                },
            },
            "Success Edit": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Employees List",
                        actions: [],
                    },
                },
            },
            "Change Employee Status": {
                on: {
                    Save: {
                        target: "Confirm status change",
                    },
                    Cancel: {
                        target: "Active Employee",
                    },
                },
            },
            "Reinstate confirm": {
                on: {
                    Cancel: {
                        target: "Reinstate Employee",
                    },
                    Confirm: {
                        target: "Save reinstate",
                    },
                },
            },
            "Confirm status change": {
                on: {
                    Cancel: {
                        target: "Change Employee Status",
                    },
                    Yes: {
                        target: "Save status change",
                    },
                },
            },
            "Save reinstate": {
                invoke: {
                    src: "reinstateEmployee",
                    id: "invoke-gipk3",
                    onDone: [
                        {
                            target: "Reinstate success",
                            guard: "onDone",
                        },
                        {
                            target: "Reinstate Error",
                            guard: "onError",
                        },
                    ],
                },
            },
            "Save status change": {
                invoke: {
                    src: "updateEmployeeStatus",
                    id: "invoke-61tol",
                    onDone: [
                        {
                            target: "Status change done",
                            guard: "onDone",
                        },
                        {
                            target: "Status change error",
                        },
                    ],
                },
            },
            "Reinstate success": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Active Employee",
                        actions: [],
                    },
                },
            },
            "Reinstate Error": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Reinstate Employee",
                        actions: [],
                    },
                },
            },
            "Status change done": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Inactive Employee",
                        actions: [],
                    },
                },
            },
            "Status change error": {
                after: {
                    "1200": {
                        target: "#EmployeesManagementMachine.Change Employee Status",
                        actions: [],
                    },
                },
            },
        },
        schema: {
            events: {} as
                | { type: "" }
                | { type: "Ok" }
                | { type: "Yes" }
                | { type: "Prev" }
                | { type: "Save" }
                | { type: "Cancel" }
                | { type: "Confirm" }
                | { type: "Go Back" }
                | { type: "Save Edit" }
                | { type: "reinstate" }
                | { type: "Save Employee" }
                | { type: "Go New Employee" }
                | { type: "Go to Edit Employee" }
                | { type: "Go to change status" }
                | { type: "Go to Get Employee Brief" }
                | { type: "Go Next" },
            context: {} as {
                work_area: string;
                employee_list: unknown[];
                request_message: string;
                current_employee_data: {};
                path: unknown[];
            },
        },
        predictableActionArguments: true,
        preserveActionOrder: true,
    },
    {
        actions: {},
        services: {
            getEmployeeList: createMachine( {
                /* ... */
            } ),
            getEmployeeBrief: createMachine( {
                /* ... */
            } ),
            updateEmployeeStatus: createMachine( {
                /* ... */
            } ),
            reinstateEmployee: createMachine( {
                /* ... */
            } ),
            getEmployeData: createMachine( {
                /* ... */
            } ),
            saveEmployeeData: createMachine( {
                /* ... */
            } ),
            saveEmployeedata: createMachine( {
                /* ... */
            } ),
        },
        guards: {
            onDone: ( context, event ) => {
                return false;
            },
            onError: ( context, event ) => {
                return false;
            },
            isActive: ( context, event ) => {
                return false;
            },
        },
        delays: {},
    },
);

export default EmployeesManagementMachine;