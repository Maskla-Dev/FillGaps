import { assign, fromPromise, setup } from "xstate";
import {
    doLogin, doLogout,
    getPhoto,
    getUserDataFromCache,
    refreshCredentials,
    validateCredentials
} from "./actions/UserSessionActions.ts";

export interface BasicEmployeeData {
    user_id: number;
    name: string;
    role: string;
    photo: any;
}

export interface UserSessionData extends BasicEmployeeData {
    tokens: {
        access: string;
        refresh: string;
    }
}

export interface AppMachineContext {
    user_data: UserSessionData;
    message: string;
}

interface AppMachineTypes {
    context: AppMachineContext;
    events: {
        type: "logging-in";
        password: string;
        user: string;
    } | {
        type: "Get user data";
        user_data: UserSessionData;
    } | any;
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

const initial_context_data: AppMachineContext = {
    user_data: {
        name: "",
        user_id: 0,
        tokens: {
            access: "",
            refresh: "",
        },
        role: "",
        photo: "",
    },
    message: "",
}

const AppMachine = BaseAppMachine.createMachine( {
    actions: {},
    actors: {},
    delays: {
        "login-delay": 1200,
    },
    id: "app",
    initial: "App Init",
    context: {
        ...initial_context_data
    },
    states: {
        "App Init": {
            always: {
                target: "Get user data"
            }
        },
        "Get user data": {
            invoke: {
                src: fromPromise( () => getUserDataFromCache() ),
                onDone: {
                    target: "Validate credentials",
                    actions: assign( {
                        user_data: ( { event } ) => {
                            console.log( event.output )
                            return event.output;
                        }
                    } )
                },
                onError: {
                    target: "logged-out",
                }
            }
        },
        "Validate credentials": {
            invoke: {
                src: fromPromise( ( { input } ) => validateCredentials( input.user_data.tokens.access ) ),
                input: ( { context: { user_data } } ) => {
                    return {
                        user_data: user_data
                    }
                },
                onDone: {
                    target: "get-photo",
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
                    target: "get-photo",
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
                    target: "logged-out"
                }
            }
        },
        "logged-out": {
            on: {
                "LOGIN": {
                    target: "logging-in",
                },
            }
        },
        "logging-in": {
            invoke: {
                src: fromPromise( ( { input } ) => doLogin( input.user, input.password ) ),
                input: ( { event } ) => {
                    console.log( event );
                    return {
                        user: event.username,
                        password: event.password
                    }
                },
                onDone: {
                    target: "get-photo",
                    actions: assign( {
                        user_data: ( { event } ) => {
                            console.log( event.output )
                            return event.output;
                        }
                    } )
                },
                onError: {
                    target: "logging-error",
                    actions: assign( {
                        message: ( { event } ) => {
                            console.log( event )
                            return String( event.error );
                        }
                    } )
                }
            }
        },
        "logging-error": {
            after: {
                3000: {
                    target: "logged-out",
                },
            },
            on: {
                "LOGIN": {
                    target: "logging-in",
                },
            },
            exit: assign( { message: "" } )
        },
        "get-photo": {
            invoke: {
                id: "get-photo",
                src: fromPromise( ( { input }: any ) => getPhoto( input.user_data.tokens.access ) ),
                input: ( { context: { user_data } } ) => {
                    return {
                        user_data: user_data
                    }
                },
                onDone: {
                    target: "fillgaps-app",
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
                    target: "wrong-user-data",
                    actions: assign( {
                        message: ( { event } ) => {
                            console.log( event )
                            return String( event.error );
                        }
                    } )
                }
            }
        },
        "wrong-user-data": {
            on: {
                "CLOSE_ERROR": {
                    target: "fillgaps-app",
                }
            }
        },
        "fillgaps-app": {
            on: {
                "OPEN_PROFILE": {
                    target: "profile-info",
                },
            }
        },
        "profile-info": {
            on: {
                "CLOSE_PROFILE": {
                    target: "fillgaps-app",
                },
                "LOGOUT": {
                    target: "logged-out",
                    actions: [assign( {
                        ...initial_context_data
                    } ), "clearCache"]
                }
            }
        }
    }
} );

export default AppMachine;