import { assign, createMachine, fromPromise } from "xstate";
import { getEmployeeBrief, reinstateEmployee, updateEmployeeStatus } from "./actions/EmployeeManagementActions";
import { EmployeeBrief } from "./models/EmployeeBriefModels";
import { Employee } from "./models/EmployeesManagementModels";

type EmployeeBriefContext = EmployeeBrief & { key: string }

export const initial_brief_data_machine: EmployeeBriefContext = {
    employee_id: -1,
    key: "",
    name: "",
    email: "",
    role: "Idle",
    department: "",
    photo: "",
    state: "Active",
    since: ( new Date() ).toString(),
    init_journey: ( new Date() ).toString(),
    end_journey: ( new Date() ).toString(),
}

export const EmployeeBriefMachine = createMachine(
    {
        id: "EmployeeBriefMachine",
        initial: "Get Employee Brief",
        context: ( { input }: { input: { employee: Employee & { key: string } } } ) => {
            console.log( "Employee Brief Context input", input );
            return {
                ...initial_brief_data_machine,
                ...input.employee
            }
        },
        states: {
            "Get Employee Brief": {
                invoke: {
                    src: fromPromise( ( { input } ) => getEmployeeBrief( input.key, input.employee_id ) ),
                    input: ( { context } ) => {
                        return {
                            key: context.key,
                            employee_id: context.employee_id,
                        }
                    },
                    id: "invoke-1",
                    onDone: [
                        {
                            target: "Main Brief",
                            actions: assign( {
                                ...( { event } ) => {
                                    return event.output;
                                },
                            } ),
                        },
                    ],
                    onError: "Error",
                },
            },
            "Error": {
                type: "final",
            },
            "End Brief": {
                type: "final",
            },
            "Main Brief": {
                always: [
                    {
                        target: "Active Employee",
                        guard: "isActive",
                    },
                    {
                        target: "Inactive Employee",
                    },
                ],
            },
            "Active Employee": {
                on: {
                    "Go Next": "Change Active Status",
                    "Cancel": "End Brief"
                },
            },
            "Inactive Employee": {
                on: {
                    "Go Next": "Reinstate Employee",
                    "Cancel": "End Brief"
                },
            },
            "Change Active Status": {
                on: {
                    "Go Next": "Save Status Change",
                    "Go Back": "Active Employee",
                }
            },
            "Reinstate Employee": {
                on: {
                    "Go Next": "Save Reinstate",
                    "Go Back": "Inactive Employee",
                },
            },
            "Save Reinstate": {
                invoke: {
                    src: fromPromise( ( { input } ) => reinstateEmployee( input.key, input.employee_id ) ),
                    input: ( { context, event }: {
                        context: EmployeeBriefContext;
                        event: any
                    } ) => {
                        return {
                            employee_id: context.employee_id,
                            key: event.key,
                        }
                    },
                    id: "invoke-gipk3",
                    onDone: [
                        {
                            target: "Reinstate Success",
                        },
                    ],
                    onError: [
                        {
                            target: "Reinstate Error",
                        },
                    ],
                },
            },
            "Save Status Change": {
                invoke: {
                    src: fromPromise( ( { input } ) => updateEmployeeStatus( input.key, input.data, input.temporal_required ) ),
                    input: ( { context, event }: {
                        context: EmployeeBriefContext;
                        event: any
                    } ) => {
                        return {
                            key: event.key,
                            data: {
                                ...context,
                                state: event.state
                            },
                            temporal_required: event.data
                        }
                    },
                    id: "invoke-61tol",
                    onDone: [
                        {
                            target: "Status Change Done",
                            actions: assign( {
                                state: ( { event } ) => {
                                    return event.output;
                                }
                            } ),
                        },
                    ],
                    onError: [
                        {
                            target: "Status Change Error",
                        },
                    ],
                },
            },
            "Reinstate Success": {
                after: {
                    "3000": {
                        target: "Active Employee",
                        actions: assign( {
                            state: "Active"
                        } ),
                    },
                },
            },
            "Reinstate Error": {
                after: {
                    "1200": {
                        target: "Reinstate Employee",
                    },
                },
            },
            "Status Change Done": {
                after: {
                    "3000": {
                        target: "Inactive Employee",
                    },
                },
            },
            "Status Change Error": {
                after: {
                    "3000": {
                        target: "Change Active Status",
                        actions: assign( {
                            state: "Active"
                        } ),
                    },
                },
            },
        },
        types: {
            context: {} as EmployeeBriefContext,
            events: {} as
                {
                    type: "Go Next"
                }
                | {
                type: "Go Back"
            }
                | {
                type: "Save"
            }
                | {
                type: "Cancel"
            },
        },
    },
    {
        actions: {},
        actors: {},
        guards: {
            isActive: ( { context } ) => {
                return context.state == "Active";
            },
        },
        delays: {},
    },
);