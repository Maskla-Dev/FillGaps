import {
    EmployeeManagementMachineContext,
    EmployeeManagementMachineTypes
} from "./models/EmployeeManagementMachineModels.ts";
import { assign, fromPromise, setup } from "xstate";
import { getEmployeesList } from "./actions/EmployeeManagementActions.ts";

export const initial_employee_management_context: EmployeeManagementMachineContext = {
    work_area: "",
    current_employee: -1,
    employee_list: [],
    dialog_message: "",
}

const BaseEmployeeManagementMachine = setup( {
    types: {} as EmployeeManagementMachineTypes,
} );

export const EmployeeManagementMachine = BaseEmployeeManagementMachine.createMachine( {
    context: initial_employee_management_context,
    id: "employee_management",
    initial: "Work Areas",
    states: {
        "Work Areas": {
            entry: assign( {
                dialog_message: ""
            } ),
            on: {
                "Go Next": {
                    target: "Get Employees List",
                    actions: assign( {
                        work_area: ( { event }: { event: any } ) => {
                            return event.work_area;
                        }
                    } )
                },
                "Edit Employee": {
                    target: "Edit Employee",
                    actions: assign( {
                        current_employee: ( { event }: { event: any } ) => {
                            return event.employee_id;
                        }
                    } )
                },
                "Go To Employee Brief": {
                    target: "Employee Brief",
                    actions: assign( {
                        current_employee: ( { event }: { event: any } ) => {
                            return event.employee_id;
                        }
                    } )
                },
            },
        },
        "Edit Employee": {
            on: {
                "Go Back": "Work Areas",
                "Edit Success": "Get Employees List",
                "Edit Error": "Edit Employee Error"
            },
        },
        "Edit Employee Error": {
            after: {
                "3000": "Work Areas"
            },
        },
        "Get Employees List": {
            invoke: {
                src: fromPromise( ( { input } ) => getEmployeesList( input.work_area, input.key ) ),
                id: "invoke-tk7hp",
                input: ( { context, event }: { context: EmployeeManagementMachineContext, event: any } ) => {
                    console.log( event )
                    return {
                        work_area: context.work_area,
                        key: event.access,
                    };
                },
                onDone: {
                    target: "Work Areas",
                    actions: assign( {
                        employee_list: ( { event } ) => {
                            console.log( event )
                            return event.output;
                        },
                    } ),
                },
                onError: {
                    target: "Employee List Error",
                    actions: assign( {
                        dialog_message: ( { event }: { event: any } ) => {
                            console.log( event )
                            return String( event.error );
                        }
                    } ),
                },
            },
        },
        "Employee List Error": {
            after: {
                "3000": {
                    target: "Work Areas",
                },
            },
        },
        "Employee Brief": {
            entry: assign( {
                current_employee: ( { event }: { event: any } ) => {
                    return event.employee_id;
                },
            } ),
            on: {
                "Go Back": "Work Areas",
                "Edit Employee": {
                    target: "Edit Employee",
                    actions: assign( {
                        current_employee: ( { event }: { event: any } ) => {
                            return event.employee_id;
                        }
                    } )
                },
            },
        },
        "Employee Brief Error": {
            after: {
                "3000": {
                    target: "Work Areas",
                },
            },
        }
    },
} );