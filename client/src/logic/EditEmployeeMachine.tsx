import { assign, fromPromise, setup } from "xstate";
import {
    EditEmployeeMachineContext,
    EditEmployeeMachineTypes, EmployeeDocuments, GeneralData, MedicalFile, WorkerData,
} from "./models/EditEmployeeMachineModels.ts";
import { getEmployeeData, saveEmployeeData } from "./actions/EmployeeManagementActions.ts";

const BaseMachine = setup( {
    types: {} as EditEmployeeMachineTypes,
    actions: {},
    guards: {},
    actors: {}
} );

export const initial_edit_employee_context: EditEmployeeMachineContext & { key: string } = {
    general_data: null,
    employee_documents: null,
    medical_file: null,
    worker_data: null,
    message: "",
    from: "",
    employee_id: -1,
    key: ""
}

const EditEmployeeMachine = BaseMachine.createMachine( {
        id: "EditEmployeeMachine",
        initial: "Start Edit",
        context: ( { input }: { input: any } ) => {
            console.log( "Edit Employee Machine input", input );
            return {
                ...initial_edit_employee_context,
                employee_id: input.employee_id,
                key: input.key
            }
        },
        states: {
            "Start Edit": {
                always: [
                    {
                        target: "Personal Info",
                        guard: ( { context } ) => {
                            return context.employee_id == -1;
                        },
                    },
                    {
                        target: "Get Employee Data",
                    },
                ],
            },
            "Personal Info": {
                entry: assign( { from: "", message: "" } ),
                exit: assign( {
                    general_data: ( { context, event } ) => {
                        console.log( "Personal Info", event.data )
                        let general_data: GeneralData | null = null;
                        if ( context.general_data ) {
                            general_data = context.general_data;
                        }
                        if ( event.data ) {
                            general_data = { ...event.data as GeneralData }
                        }
                        return general_data;
                    }
                } ),
                on: {
                    "Go Documents": "Documents",
                    "Go Medical File": "Medical File",
                    "Go Worker Data": "Worker Data",
                    "Go Personal Info": {
                        type: "Personal Info",
                        actions: assign( {
                            general_data: ( { context, event } ) => {
                                console.log( "Personal Info", event.data )
                                let general_data: GeneralData | null = null;
                                if ( context.general_data ) {
                                    general_data = context.general_data;
                                }
                                if ( event.data ) {
                                    general_data = { ...event.data as GeneralData }
                                }
                                return general_data;
                            }
                        } )
                    },
                    "Cancel": {
                        target: "Cancel Wall",
                        actions: assign( { message: "", from: "Personal Info" } )
                    },
                    "Save": {
                        target: "Save Wall",
                        actions: assign( { message: "", from: "Personal Info" } )
                    }
                },
            },
            "Get Employee Data": {
                invoke: {
                    src: fromPromise( ( { input } ) => getEmployeeData( input.key, input.employee_id ) ),
                    id: "invoke-181ja",
                    input: ( { context } ) => {
                        return {
                            key: context.key,
                            employee_id: context.employee_id
                        }
                    },
                    onDone: [
                        {
                            target: "Personal Info",
                            actions: assign( {
                                general_data: ( { event } ) => {
                                    return event.output.general_data;
                                },
                                employee_documents: ( { event } ) => {
                                    return event.output.documents;
                                },
                                medical_file: ( { event } ) => {
                                    return event.output.medical_file;
                                },
                                worker_data: ( { event } ) => {
                                    return event.output.worker_data;
                                },
                            } ),
                        },
                    ],
                    onError: [
                        {
                            target: "Error",
                            actions: assign( {
                                message: "Cannot get employee data, try again later or contact the administrator",
                            } ),
                        },
                    ],
                },
            },
            "Documents": {
                entry: assign( { from: "", message: "" } ),
                exit: assign( {
                    employee_documents: ( { context, event } ) => {
                        let documents: EmployeeDocuments | null = null;
                        if ( context.employee_documents ) {
                            documents = context.employee_documents;
                        }
                        if ( event.data ) {
                            documents = { ...event.data as EmployeeDocuments }
                        }
                        return documents;
                    }
                } ),
                on: {
                    "Go Personal Info": "Personal Info",
                    "Go Worker Data": "Worker Data",
                    "Go Medical File": "Medical File",
                    "Go Documents": {
                        type: "Documents",
                        actions: assign( {
                            employee_documents: ( { context, event } ) => {
                                let documents: EmployeeDocuments | null = null;
                                if ( context.employee_documents ) {
                                    documents = context.employee_documents;
                                }
                                if ( event.data ) {
                                    documents = { ...event.data as EmployeeDocuments }
                                }
                                return documents;
                            }
                        } ),
                    },
                    "Cancel": {
                        target: "Cancel Wall",
                        actions: assign( { message: "", from: "Documents" } )
                    },
                    "Save": {
                        target: "Save Wall",
                        actions: assign( { message: "", from: "Documents" } )
                    }
                },
            },
            "Medical File": {
                entry: assign( { from: "", message: "" } ),
                exit: assign( {
                    medical_file: ( { context, event } ) => {
                        let medical_file: MedicalFile | null = null;
                        console.log( "Medical File", event.data )
                        if ( context.medical_file ) {
                            medical_file = context.medical_file;
                        }
                        if ( event.data ) {
                            medical_file = { ...event.data as MedicalFile }
                        }
                        return medical_file;
                    }
                } ),
                on: {
                    "Go Worker Data": "Worker Data",
                    "Go Documents": "Documents",
                    "Go Personal Info": "Personal Info",
                    "Go Medical File": {
                        target: "Medical File",
                        actions: assign( {
                            medical_file: ( { context, event } ) => {
                                let medical_file: MedicalFile | null = null;
                                console.log( "Medical File", event.data )
                                if ( context.medical_file ) {
                                    medical_file = context.medical_file;
                                }
                                if ( event.data ) {
                                    medical_file = { ...event.data as MedicalFile }
                                }
                                return medical_file;
                            }
                        } ),
                    },
                    "Save": {
                        target: "Save Wall",
                        actions: assign( { message: "", from: "Medical File" } )
                    },
                    "Cancel": {
                        target: "Cancel Wall",
                        actions: assign( { message: "", from: "Medical File" } )
                    }
                },
            },
            "Worker Data": {
                entry: assign( { message: "", from: "" } ),
                exit: assign( {
                    worker_data: ( { context, event } ) => {
                        let worker_data: WorkerData | null = null;
                        if ( context.worker_data ) {
                            worker_data = context.worker_data;
                        }
                        if ( event.data ) {
                            worker_data = { ...event.data as WorkerData }
                        }
                        return worker_data;
                    }
                } ),
                on: {
                    "Go Documents": {
                        target: "Documents",
                    },
                    "Go Medical File": "Medical File",
                    "Go Personal Info": "Personal Info",
                    "Go Worker Data": {
                        type: "Worker Data",
                        actions: assign( {
                            worker_data: ( { context, event } ) => {
                                let worker_data: WorkerData | null = null;
                                if ( context.worker_data ) {
                                    worker_data = context.worker_data;
                                }
                                if ( event.data ) {
                                    worker_data = { ...event.data as WorkerData }
                                }
                                return worker_data;
                            }
                        } )
                    },
                    "Cancel": {
                        target: "Cancel Wall",
                        actions: assign( { message: "", from: "Worker Data" } )
                    },
                    "Save": {
                        target: "Save Wall",
                        actions: assign( { message: "", from: "Worker Data" } )
                    }
                },
            },
            "Cancel Wall": {
                on: {
                    "Go Back": [
                        {
                            target: "Personal Info",
                            guard: ( { context } ) => {
                                return context.from == "Personal Info";
                            }
                        },
                        {
                            target: "Documents",
                            guard: ( { context } ) => {
                                return context.from == "Documents";
                            }
                        },
                        {
                            target: "Worker Data",
                            guard: ( { context } ) => {
                                return context.from == "Worker Data";
                            }
                        },
                        {
                            target: "Medical File",
                            guard: ( { context } ) => {
                                return context.from == "Medical File";
                            }
                        }
                    ],
                    "Go Next": "End Edit"
                }
            },
            "Save Wall": {
                on: {
                    "Go Back": [
                        {
                            target: "Personal Info",
                            guard: ( { context } ) => {
                                return context.from == "Personal Info";
                            }
                        },
                        {
                            target: "Documents",
                            guard: ( { context } ) => {
                                return context.from == "Documents";
                            }
                        },
                        {
                            target: "Worker Data",
                            guard: ( { context } ) => {
                                return context.from == "Worker Data";
                            }
                        },
                        {
                            target: "Medical File",
                            guard: ( { context } ) => {
                                return context.from == "Medical File";
                            }
                        }
                    ],
                    "Go Next": "Save Employee Data",
                },
            },
            "Save Employee Data": {
                invoke: {
                    src: fromPromise( ( { input } ) => {
                        console.log( "Save Employee Data", input )
                        return saveEmployeeData( input.key, input.data );
                    } ),
                    id: "invoke-etex6",
                    input: ( { context } ) => {
                        return {
                            // @ts-ignore
                            key: context.key,
                            data: {
                                general_data: context.general_data!,
                                employee_documents: context.employee_documents!,
                                medical_file: context.medical_file!,
                                worker_data: context.worker_data!,
                                employee_id: context.employee_id
                            }
                        }
                    },
                    onDone: [
                        {
                            target: "End Save",
                            actions: assign( { message: "Successfully saved" } ),
                        },
                    ],
                    onError: [
                        {
                            target: "Save Error",
                            actions: assign( {
                                message: "Cannot save data, try again later or contact the administrator",
                                from: "Medical File",
                            } ),
                        },
                    ],
                },
            },
            "Save Error": {
                after: {
                    3000: [
                        {
                            target: "Personal Info",
                            guard: ( { context } ) => {
                                return context.from == "Personal Info";
                            }
                        },
                        {
                            target: "Documents",
                            guard: ( { context } ) => {
                                return context.from == "Documents";
                            }
                        },
                        {
                            target: "Worker Data",
                            guard: ( { context } ) => {
                                return context.from == "Worker Data";
                            }
                        },
                        {
                            target: "Medical File",
                            guard: ( { context } ) => {
                                return context.from == "Medical File";
                            }
                        }
                    ]
                }
            },
            "Error": {
                type: "final",
            },
            "End Edit": {
                type: "final",
            },
            "End Save": {
                type: "final",
            },
        },
    },
);

export default EditEmployeeMachine;