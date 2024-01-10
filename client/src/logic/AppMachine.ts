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
                                photo: `http://127.0.0.1:8000${event.output}`
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
                            on: {
                                "Go Panel": "Main"
                            }
                        }
                    }
                },
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