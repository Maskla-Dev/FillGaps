import { assign, fromPromise, setup } from "xstate";
import {
    doLogin, doLogout,
    getPhoto,
    getUserDataFromCache,
    refreshCredentials,
    validateCredentials
} from "./actions/UserSessionActions.ts";
import {
    AppMachineTypes,
    AppData,
    AppMachineContext,
    Chat,
    EmployeeManagement,
    TransitionCache,
    UserSessionData, UserCredentials
} from "./models/AppMachineModels.ts";
import {
    getEmployeeBrief, getEmployeeData,
    getEmployeesList,
    saveEmployeeData,
    updateEmployeeStatus
} from "./actions/EmployeeManagementActions.ts";

const initial_user_session_data: UserSessionData = {
    name: "",
    employee_id: -1,
    tokens: {
        access: "",
        refresh: "",
    },
    role: "",
    photo: "",
    email: "",
    department: "",
}

const initial_employee_management: EmployeeManagement = {
    work_area: "",
    employee_list: [],
    current_employee: -1,
    employee_data: null,
}

const initial_transition_cache: TransitionCache = {
    dialog_message: "",
    target: "",
}

const initial_chat: Chat = {
    chat_service: null,
    channels: [],
    current_channel: -1,
}

const initial_app_data: AppData = {
    panel: initial_employee_management,
    chat: initial_chat,
}

const initial_machine_context: AppMachineContext = {
    user_data: initial_user_session_data,
    cache: initial_transition_cache,
    data: initial_app_data,
}

const BaseAppMachine = setup( {
    types: {} as AppMachineTypes,
    actions: {
        clearCache: () => {
            console.log( "Cleaning cache" )
            return doLogout();
        }
    },
} );

const AppMachine = BaseAppMachine.createMachine( {
    actions: {},
    actors: {},
    delays: {},
    id: "app",
    initial: "App Init",
    context: {
        ...initial_machine_context
    },
    states: {
        "App Init": {
            always: {
                target: "Get User Data"
            }
        },
        "Get User Data": {
            invoke: {
                src: fromPromise( () => getUserDataFromCache() ),
                onDone: {
                    target: "Validate Credentials",
                    actions: assign( {
                        user_data: ( { event } ) => {
                            console.log( event.output )
                            return event.output;
                        }
                    } )
                },
                onError: {
                    target: "Logged Out",
                }
            }
        },
        "Validate Credentials": {
            invoke: {
                src: fromPromise( ( { input } ) => validateCredentials( input.user_data.tokens.access ) ),
                input: ( { context: { user_data } } ) => {
                    return {
                        user_data: user_data
                    }
                },
                onDone: {
                    target: "Get Photo",
                },
                onError: {
                    target: "Refresh Credentials",
                }
            }
        },
        "Refresh Credentials": {
            invoke: {
                src: fromPromise( ( { input } ) => refreshCredentials( input.user_data.tokens.refresh ) ),
                input: ( { context: { user_data } } ) => {
                    return {
                        user_data: user_data
                    }
                },
                onDone: {
                    target: "Get Photo",
                    actions: assign( {
                        user_data: ( { context, event } ) => {
                            console.log( event.output )
                            return {
                                ...context.user_data,
                                tokens: {
                                    ...context.user_data.tokens,
                                    access: event.output.access
                                }
                            }
                        }
                    } )
                },
                onError: {
                    target: "Logged Out"
                }
            }
        },
        "Logged Out": {
            on: {
                "Send Credentials": {
                    target: "Logging In",
                },
            }
        },
        "Logging In": {
            invoke: {
                src: fromPromise( ( { input } ) => doLogin( input.user, input.password ) ),
                input: ( { event }: { event: UserCredentials } ) => {
                    console.log( event );
                    return {
                        user: event.username,
                        password: event.password
                    }
                },
                onDone: {
                    target: "Get Photo",
                    actions: assign( {
                        user_data: ( { event } ) => {
                            console.log( event.output )
                            return event.output;
                        }
                    } )
                },
                onError: {
                    target: "Logging Error",
                    actions: assign( {
                        cache: ( { event, context } ) => {
                            console.log( event )
                            return {
                                ...context.cache,
                                dialog_message: String( event.error ),
                            };
                        }
                    } )
                }
            }
        },
        "Logging Error": {
            after: {
                3000: {
                    target: "Logged Out",
                },
            },
            on: {
                "Send Credentials": {
                    target: "Logging In",
                },
            },
            exit: assign( {
                cache: initial_transition_cache
            } )
        },
        "Get Photo": {
            invoke: {
                id: "get-photo",
                src: fromPromise( ( { input }: any ) => getPhoto( input.user_data.tokens.access ) ),
                input: ( { context: { user_data } } ) => {
                    return {
                        user_data: user_data
                    }
                },
                onDone: {
                    target: "FillGaps App",
                    actions: assign( {
                        user_data: ( { context, event } ) => {
                            console.log( event.output )
                            return {
                                ...context.user_data,
                                photo: URL.createObjectURL( event.output )
                            }
                        }
                    } )
                },
                onError: {
                    target: "Wrong User Data",
                    actions: assign( {
                        cache: ( { event, context } ) => {
                            console.log( event )
                            return {
                                ...context.cache,
                                dialog_message: String( event.error ),
                            };
                        }
                    } )
                }
            }
        },
        "Wrong User Data": {
            on: {
                "Ok": {
                    target: "FillGaps App",
                }
            }
        },
        "FillGaps App": {
            type: "parallel",
            states: {
                "Profile Info": {
                    initial: "Profile Hidden",
                    states: {
                        "Profile Hidden": {
                            on: {
                                "Show Profile Info": {
                                    target: "Profile Shown",
                                },
                            }
                        },
                        "Profile Shown": {
                            on: {
                                "Hide Profile Info": {
                                    target: "Profile Hidden",
                                },
                            }
                        }
                    }
                },
                "Panel": {
                    initial: "Main",
                    states: {
                        "Main": {
                            on: {
                                "Go Employees Management": {
                                    target: "Employees Management"
                                }
                            }
                        },
                        "Employees Management": {
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
                                        "New": {
                                            target: "New Employee",
                                        },
                                    },
                                },
                                "New Employee": {
                                    initial: "Personal Info",
                                    states: {
                                        "Personal Info": {
                                            on: {
                                                "Go Next": {
                                                    target: "Documents",
                                                },
                                                "Save Data": {
                                                    target: "Personal Info",
                                                },
                                            },
                                        },
                                        "Documents": {
                                            on: {
                                                "Go Back": {
                                                    target: "Personal Info",
                                                },
                                                "Go Next": {
                                                    target: "Employee Data",
                                                },
                                                "Save Data": {
                                                    target: "Documents",
                                                },
                                            },
                                        },
                                        "Employee Data": {
                                            on: {
                                                "Go Back": {
                                                    target: "Documents",
                                                },
                                                "Go Next": {
                                                    target: "Medical File",
                                                },
                                                "Go Back 2 Steps": {
                                                    target: "Personal Info",
                                                },
                                                "Save Data": {
                                                    target: "Employee Data",
                                                },
                                            },
                                        },
                                        "Medical File": {
                                            on: {
                                                "Go": {
                                                    target: "Employee Data",
                                                },
                                                "Go Back 2 Steps": {
                                                    target: "Documents",
                                                },
                                                "Go Back 3 Steps": {
                                                    target: "Personal Info",
                                                },
                                                "Save Data": {
                                                    target: "Medical File",
                                                },
                                            },
                                        },
                                    },
                                    on: {
                                        "Cancel": {
                                            target: "Cancel New Employee",
                                        },
                                        "Save Employee": {
                                            target: "Save New Employee",
                                        },
                                        "Go Work Areas": {
                                            target: "Work Areas"
                                        },
                                        "Go Back": {
                                            target: "Employees List",
                                        }
                                    },
                                },
                                "Cancel New Employee": {
                                    on: {
                                        "Cancel": {
                                            target: "New Employee",
                                        },
                                        "Ok": {
                                            target: "Work Areas",
                                        },
                                    },
                                },
                                "Save New Employee": {
                                    on: {
                                        "Cancel": {
                                            target: "New Employee",
                                        },
                                        "Save": {
                                            target: "Save Employee",
                                        },
                                    },
                                },
                                "Save Employee": {
                                    invoke: {
                                        src: fromPromise( ( { input } ) => saveEmployeeData( input.access, input.employee_data ) ),
                                        id: "invoke-hbdl0",
                                        input: ( { context }: { context: AppMachineContext } ) => {
                                            return {
                                                access: context.user_data.tokens.access,
                                                employee_data: context.data.panel.employee_data,
                                            };
                                        },
                                        onDone: {
                                            target: "Success Save"
                                        },
                                        onError: {
                                            target: "New Employee",
                                        }
                                    },
                                },
                                "Get Employees List": {
                                    invoke: {
                                        src: fromPromise( ( { input } ) => getEmployeesList( input.work_area, input.key ) ),
                                        id: "invoke-tk7hp",
                                        input: ( { context, event }: { context: AppMachineContext; event: any } ) => {
                                            return {
                                                work_area: event.work_area,
                                                key: context.user_data.tokens.access,
                                            };
                                        },
                                        onDone: {
                                            target: "Employees List",
                                            actions: assign( {
                                                data: ( { context, event } ) => {
                                                    return {
                                                        ...context.data,
                                                        panel: {
                                                            ...context.data.panel,
                                                            employee_list: event.output,
                                                        },
                                                    };
                                                },
                                            } ),
                                        },
                                        onError: {
                                            target: "Employee List Error",
                                            actions: assign( {
                                                cache: ( { event, context }: { event: any; context: AppMachineContext } ) => {
                                                    console.log( event )
                                                    return {
                                                        ...context.cache,
                                                        dialog_message: String( event.error ),
                                                    };
                                                }
                                            } ),
                                        },
                                    },
                                },
                                "Employees List": {
                                    on: {
                                        "New": {
                                            target: "New Employee",
                                        },
                                        "Go To Get Employee Brief": {
                                            target: "Get Employee Brief",
                                        },
                                        "Go Back": {
                                            target: "Work Areas",
                                        }
                                    },
                                },
                                "Employee List Error": {
                                    after: {
                                        "1200": {
                                            target:
                                                "Work Areas",
                                            actions: [],
                                        },
                                    },
                                },
                                "Get Employee Brief": {
                                    invoke: {
                                        src: fromPromise( ( { input } ) => getEmployeeBrief( input.access, input.employee_id ) ),
                                        id: "invoke-1g426",
                                        input: ( { context, event }: { context: AppMachineContext; event: any } ) => {
                                            return {
                                                access: context.user_data.tokens.access,
                                                employee_id: event.employee_id,
                                            }
                                        },
                                        onDone: {
                                            target: "Employee Brief",
                                        },
                                        onError: {
                                            target: "Employee Brief Error",
                                        },
                                    },
                                },
                                "Employee Brief": {
                                    initial: "Main Brief",
                                    states: {
                                        "Main Brief": {
                                            always: [
                                                {
                                                    target: "Active Employee",
                                                    guard: "isActive"
                                                },
                                                {
                                                    target: "Inactive Employee"
                                                }
                                            ]
                                        },
                                        "Active Employee": {
                                            on: {
                                                "Go To Change Status": {
                                                    target: "Change Employee Status Advice",
                                                },
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
                                        "Change Employee Status": {
                                            on: {
                                                Save: {
                                                    target: "Confirm Status Change",
                                                },
                                                Cancel: {
                                                    target: "Active Employee",
                                                },
                                            },
                                        },
                                        "Confirm Status Change": {
                                            on: {
                                                "Cancel": {
                                                    target: "Change Employee Status",
                                                },
                                                "Yes": {
                                                    target: "Save Status Change",
                                                },
                                            },
                                        },
                                        "Save Status Change": {
                                            invoke: {
                                                src: fromPromise( ( { input } ) => updateEmployeeStatus( input.access, input.data ) ),
                                                id: "invoke-61tol",
                                                input: ( { context, event }: { context: AppMachineContext; event: any } ) => {
                                                    return {
                                                        access: context.user_data.tokens.access,
                                                        data: event.data,
                                                    };
                                                },
                                                onDone: {
                                                    target: "Status Change Done"
                                                },
                                                onError: {
                                                    target: "Status Change Error",
                                                },
                                            },
                                        },
                                        "Status Change Done": {
                                            after: {
                                                "1200": {
                                                    target:
                                                        "Inactive Employee",
                                                    actions: [],
                                                },
                                            },
                                        },
                                        "Status Change Error": {
                                            after: {
                                                "1200": {
                                                    target:
                                                        "Change Employee Status",
                                                    actions: [],
                                                },
                                            },
                                        },
                                        "Inactive Employee": {
                                            on: {
                                                "Reinstate": {
                                                    target: "Reinstate Employee",
                                                },
                                            },
                                        },
                                        "Reinstate Employee": {
                                            on: {
                                                Cancel: {
                                                    target: "Inactive Employee",
                                                },
                                                Save: {
                                                    target: "Reinstate Confirm",
                                                },
                                            },
                                        },
                                        "Reinstate Confirm": {
                                            on: {
                                                "Cancel": {
                                                    target: "Reinstate Employee",
                                                },
                                                "Confirm": {
                                                    target: "Save Reinstate",
                                                },
                                            },
                                        },
                                        "Save Reinstate": {
                                            invoke: {
                                                src: fromPromise( ( { input } ) => updateEmployeeStatus( input.access, input.data ) ),
                                                input: ( { context, event }: { context: AppMachineContext; event: any } ) => {
                                                    return {
                                                        access: context.user_data.tokens.access,
                                                        data: event.employee_id,
                                                    };
                                                },
                                                id: "invoke-gipk3",
                                                onDone: {
                                                    target: "Reinstate Success"
                                                },
                                                onError: {
                                                    target: "Reinstate Error",
                                                },
                                            }
                                        },
                                        "Reinstate Success": {
                                            after: {
                                                "1200": {
                                                    target:
                                                        "Active Employee",
                                                    actions: [],
                                                },
                                            },
                                        },
                                        "Reinstate Error": {
                                            after: {
                                                "1200": {
                                                    target:
                                                        "Reinstate Employee",
                                                    actions: [],
                                                },
                                            },
                                        },
                                    },
                                    on: {
                                        "Prev": {
                                            target: "Employees List",
                                        },
                                        "Go To Edit Employee": {
                                            target: "Get Employee Data",
                                        },
                                    },
                                },
                                "Employee Brief Error": {
                                    after: {
                                        "1200": {
                                            target:
                                                "Employees List",
                                            actions: [],
                                        },
                                    },
                                },
                                "Cancel": {
                                    on: {
                                        "Go Back": {
                                            target: "Employees List",
                                        },
                                    },
                                },
                                "Get Employee Data": {
                                    invoke: {
                                        src: fromPromise( ( { input } ) => getEmployeeData( input.key, input.employee_id ) ),
                                        input: ( { context, event }: { context: AppMachineContext; event: any } ) => {
                                            return {
                                                key: context.user_data.tokens.access,
                                                employee_id: event.employee_id,
                                            }
                                        },
                                        id: "invoke-i01w7",
                                        onDone: [
                                            {
                                                target: "Edit Employee",
                                                guard: "onDone",
                                            },
                                            {
                                                target: "Get Employee Data Error",
                                                guard: "onError",
                                            },
                                        ],
                                    },
                                },
                                "Edit Employee": {
                                    on: {
                                        "Go Back": {
                                            target: "Cancel Edit Employee",
                                        },
                                        "Save Edit": {
                                            target: "Confirm Save",
                                        },
                                    },
                                },
                                "Get Employee Data Error": {
                                    after: {
                                        "1200": {
                                            target:
                                                "Employees List",
                                            actions: [],
                                        },
                                    },
                                },
                                "Success Save": {
                                    after: {
                                        "1200": {
                                            target:
                                                "Employees List",
                                            actions: [],
                                        },
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
                                "Confirm Save": {
                                    on: {
                                        Cancel: {
                                            target: "Edit Employee",
                                        },
                                        Ok: {
                                            target: "Save EmployeeChanges",
                                        },
                                    },
                                },
                                "Save EmployeeChanges": {
                                    invoke: {
                                        src: fromPromise( ( { input } ) => saveEmployeeData( input.access, input.employee_data ) ),
                                        id: "invoke-w52tp",
                                        input: ( { context }: { context: AppMachineContext } ) => {
                                            return {
                                                access: context.user_data.tokens.access,
                                                employee_data: context.data.panel.employee_data,
                                            };
                                        },
                                        onDone: {
                                            target: "Success Edit"
                                        },
                                        onError: {
                                            target: "Edit Employee",
                                        },
                                    },
                                },
                                "Success Edit": {
                                    after: {
                                        "1200": {
                                            target:
                                                "Employees List",
                                            actions: [],
                                        },
                                    },
                                },
                            },
                            on: {
                                "Go Panel": {
                                    target: "Main"
                                }
                            }
                        }
                    }
                },
                "Chat": {
                    states: {
                        "Chat App": {
                            initial: "Main Chat",
                            states: {
                                "Main Chat": {
                                    always: [
                                        {
                                            target: "Channel List",
                                            guard: "isOnline",
                                        },
                                        {
                                            target: "Connecting",
                                            guard: "isConnecting",
                                        },
                                    ],
                                },
                                "Channel List": {
                                    on: {
                                        "Channel Selection": {
                                            target: "Channel",
                                        },
                                        "New Channel": {
                                            target: "New Channel",
                                        },
                                    },
                                },
                                "Connecting": {
                                    on: {
                                        "Chat Sync": [
                                            {
                                                target: "Syncing",
                                                guard: "isOnline",
                                            },
                                            {
                                                target: "Chat Offline Advice",
                                            },
                                        ],
                                    },
                                },
                                "Channel": {
                                    on: {
                                        "Go Back": {
                                            target: "Channel List",
                                        },
                                        "Show Channel Info": {
                                            target: "Channel Info",
                                        },
                                    },
                                },
                                "New Channel": {
                                    on: {
                                        "Cancel": {
                                            target: "Channel List",
                                        },
                                        "Confirm Creation": [
                                            {
                                                target: "Channel",
                                                guard: "Success creation",
                                            },
                                            {
                                                target: "New Channel Error",
                                                guard: "Channel Creation Error",
                                            },
                                        ],
                                        "Create Channel Group": {
                                            target: "New Channel Group",
                                            guard: "Is Manager",
                                        },
                                    },
                                },
                                "Syncing": {
                                    on: {
                                        "Sync Completed": {
                                            target: "Channel List",
                                        },
                                    },
                                },
                                "Chat Offline Advice": {
                                    on: {
                                        Ok: {
                                            target: "Channel List",
                                        },
                                    },
                                },
                                "Channel Info": {
                                    on: {
                                        "Hide Channel Info": {
                                            target: "Channel",
                                        },
                                        "Edit Channel": {
                                            target: "Edit Channel",
                                            guard: "Channel Admin",
                                        },
                                    },
                                },
                                "New Channel Error": {
                                    after: {
                                        "1200": {
                                            target: "New Channel",
                                            actions: [],
                                        },
                                    },
                                },
                                "New Channel Group": {
                                    on: {
                                        "Cancel": {
                                            target: "Channel List",
                                        },
                                        "Confirm Creation": [
                                            {
                                                target: "Channel",
                                                guard: "Success creation",
                                            },
                                            {
                                                target: "New Channel Group Error",
                                                guard: "Channel Creation Error",
                                            },
                                        ],
                                    },
                                },
                                "Edit Channel": {
                                    on: {
                                        "Cancel Edition": {
                                            target: "Channel Info",
                                        },
                                        "Delete Channel": {
                                            target: "Delete Channel",
                                        },
                                    },
                                },
                                "New Channel Group Error": {
                                    after: {
                                        "1200": {
                                            target: "New Channel Group",
                                            actions: [],
                                        },
                                    },
                                },
                                "Delete Channel": {
                                    on: {
                                        "Succesfull Delete": {
                                            target: "Channel List",
                                        },
                                        "Cancel Deletion": {
                                            target: "Edit Channel",
                                        },
                                    },
                                },
                            },
                        },
                        "Chat Service": {
                            initial: "Connect Chat",
                            states: {
                                "Connect Chat": {
                                    invoke: {
                                        src: "connectChat",
                                        id: "invoke-p2nz5",
                                    },
                                    on: {
                                        "Go Connected": [
                                            {
                                                target: "Connected",
                                                guard: "isConnected",
                                            },
                                            {
                                                target: "Offline Chat",
                                            },
                                        ],
                                    },
                                },
                                "Connected": {
                                    initial: "Iddle",
                                    states: {
                                        Iddle: {
                                            states: {
                                                Receive: {
                                                    initial: "Waiting",
                                                    states: {
                                                        "Waiting": {
                                                            on: {
                                                                "Sync": {
                                                                    target: "Receive Chat Sync",
                                                                },
                                                                "Message Sent": {
                                                                    target: "Receive Message Sent",
                                                                },
                                                                "Message Deleted": {
                                                                    target: "Receive Message Deleted",
                                                                },
                                                                "Channel Created": {
                                                                    target: "Receive Channel Created",
                                                                },
                                                                "Channel Deleted": {
                                                                    target: "Receive Channel Deleted",
                                                                },
                                                                "Channel Updated": {
                                                                    target: "Receive Channel Updated",
                                                                },
                                                            },
                                                        },
                                                        "Receive Chat Sync": {
                                                            on: {
                                                                "Await New Receive": {
                                                                    target: "Waiting",
                                                                    actions: {
                                                                        type: "updateDataBase",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        "Receive Message Sent": {
                                                            on: {
                                                                "Await New Receive": {
                                                                    target: "Waiting",
                                                                    actions: {
                                                                        type: "updateDataBase",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        "Receive Message Deleted": {
                                                            on: {
                                                                "Await New Receive": {
                                                                    target: "Waiting",
                                                                    actions: {
                                                                        type: "updateDataBase",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        "Receive Channel Created": {
                                                            on: {
                                                                "Await New Receive": {
                                                                    target: "Waiting",
                                                                    actions: {
                                                                        type: "updateDataBase",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        "Receive Channel Deleted": {
                                                            on: {
                                                                "Await New Receive": {
                                                                    target: "Waiting",
                                                                    actions: {
                                                                        type: "updateDataBase",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                        "Receive Channel Updated": {
                                                            on: {
                                                                "Await New Receive": {
                                                                    target: "Waiting",
                                                                    actions: {
                                                                        type: "updateDataBase",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                                Request: {
                                                    initial: "Sync Chat",
                                                    states: {
                                                        "Sync Chat": {
                                                            always: {
                                                                target: "Waiting",
                                                            },
                                                        },
                                                        "Waiting": {
                                                            on: {
                                                                "Send Request": {
                                                                    target: "Waiting",
                                                                    actions: {
                                                                        type: "sendRequest",
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                            type: "parallel",
                                        },
                                    },
                                    on: {
                                        "Disconnect": {
                                            target: "Offline Chat",
                                        },
                                    },
                                },
                                "Offline Chat": {
                                    on: {
                                        "Reconnect": {
                                            target: "Connect Chat",
                                        },
                                    },
                                },
                            },
                        },
                    },
                    type: "parallel",
                }
            },
            on: {
                "Log Out": {
                    target: "Logged Out",
                    actions: [assign( {
                        ...initial_machine_context
                    } ), "clearCache"]
                },
            }
        },
    }
} );

export default AppMachine;