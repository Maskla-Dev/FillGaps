import { assign, fromPromise, setup } from "xstate";
import { doLogin } from "../utils/actions/UserSession.ts";

export interface BasicEmployeeData {
    user_id: number;
    name: string;
    role: string;
    photo: string;
}

export interface UserSessionData extends BasicEmployeeData {
    tokens: {
        access: string;
        refresh: string;
    }
}

export interface AppMachineContext {
    user_data: UserSessionData;
    error: string;
}

interface AppMachineTypes {
    context: AppMachineContext;
    guards: {
        isManager: ( payload: AppMachineContext & { event: any } ) => boolean;
    },
    events: {
        type: "logging-in";
        password: string;
        user: string;
    } | any;
}

const BaseAppMachine = setup( {
    types: {} as AppMachineTypes,
} );

const AppMachine = BaseAppMachine.createMachine( {
    guards: {
        isManager: ( { context }: { context: AppMachineContext } ) => {
            return context.user_data.name.endsWith( "Manager" )
        },
    },
    actions: {},
    actors: {},
    delays: {
        "login-delay": 1200,
    },
    id: "app",
    initial: "logged-out",
    context: {
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
        error: "",
    },
    states: {
        "logged-out": {
            on: {
                "LOGIN": {
                    target: "logging-in",
                },
            }
        },
        "logging-in": {
            invoke: {
                id: "doLogin",
                src: fromPromise( ( { input } ) => doLogin( input.user, input.password ) ),
                input: ( { event } ) => {
                    console.log( event );
                    return {
                        user: event.username,
                        password: event.password
                    }
                },
                onDone: {
                    target: "fillgaps-app",
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
                        error: ( { event } ) => {
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
            exit: assign( { error: "" } )
        },
        "fillgaps-app": {}
    }
} );

export default AppMachine;