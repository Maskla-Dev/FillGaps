import { setup } from "xstate";

interface ActivitiesMachineContext {
    role: string;
    modal_info: string;
    access_token: string;
}

interface AppMachineTypes {
    context: ActivitiesMachineContext;
    guards: {
        isManager: ( payload: { role: string } & { event: any } ) => boolean;
        isAdministrative: ( payload: { role: string } & { event: any } ) => boolean;
    },
    events: any;
}

const BaseActivitiesMachine = setup( {
    types: {} as AppMachineTypes,
    guards: {
        isManager: ( { context }: { context: any } ) => {
            return context.role.endsWith( "Manager" )
        },
        isAdministrative: ( { context }: { context: any } ) => {
            console.log( context.role.endsWith( "Administrative" ) || context.role.startsWith( "Administrative" ) )
            return context.role.endsWith( "Administrative" ) || context.role.startsWith( "Administrative" )
        }
    },
    actions: {
        setModalInfo: ( { context }: { context: any }, { event }: { event: any } ) => {
            context.modal_info = event.modal_info;
        }
    }
} );

const initial_context_data: ActivitiesMachineContext = {
    role: "",
    modal_info: "",
    access_token: ""
}

const FeaturesMachine = BaseActivitiesMachine.createMachine( {
        context: ( { input }: { input: any } ) => ( {
            ...initial_context_data,
            role: input.role,
            access_token: input.access_token
        } ),
        id: "activities",
        initial: "panel",
        states: {
            "panel": {
                on: {
                    "GO-CHAT": {
                        target: "chat",
                    },
                    "GO-EMPLOYEES": [
                        {
                            guard: "isAdministrative",
                            target: "employees",
                            actions: [{
                                type: "setModalInfo",
                                params: {
                                    event: {
                                        modal_info: "You don't have permission to access this feature"
                                    }
                                }
                            }]
                        },
                        {
                            target: "permission-denied",
                        }
                    ]
                }
            },
            "chat": {
                on: {
                    "GO-PANEL": {
                        target: "panel"
                    },
                }
            },
            "employees": {
                on: {
                    "GO-PANEL": {
                        target: "panel"
                    },
                    "GO-CHAT": "chat",
                }
            },
            "permission-denied": {
                after: {
                    1200: {
                        target: "panel"
                    }
                },
                exit: [
                    {
                        type: "setModalInfo",
                        params: {
                            event: {
                                modal_info: ""
                            }
                        }
                    }
                ]
            },
        },
    },
);

export default FeaturesMachine;