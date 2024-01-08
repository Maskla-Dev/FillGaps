import { Employee } from "./EmployeesManagementModels.ts";
import { ChatChannel } from "./ChatModels.ts";
import { EmployeeData } from "./EditEmployeeMachineModels";

export interface AccessKeys {
    access: string;
    refresh: string;
}

export interface UserSessionData extends Employee {
    tokens: AccessKeys;
}

export interface EmployeeManagement {
    work_area: string;
    employee_list: Employee[];
    current_employee: number;
    employee_data: EmployeeData | null;
}

export interface TransitionCache {
    dialog_message: string;
    target: string;
}

export interface Chat {
    chat_service: null | WebSocket;
    channels: ChatChannel[];
    current_channel: number;
}

export interface AppData {
    panel: EmployeeManagement;
    chat: Chat;
}

export interface AppMachineContext {
    user_data: UserSessionData;
    cache: TransitionCache;
    data: AppData;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface AppMachineTypes {
    context: AppMachineContext;
    events:
        { type: "Ok" } |
        { type: "Log Out" } |
        { type: "Send Credentials"; username: string; password: string } |
        { type: "Hide Profile Info" } |
        { type: "Show Profile Info" } |
        { type: "Channel Selection" } |
        { type: "Successful Delete" } |
        { type: "Go Back" } |
        { type: "Cancel" } |
        { type: "New Channel" } |
        { type: "Done" } |
        { type: "Show Channel Info" } |
        { type: "Hide Channel Info" } |
        { type: "Confirm Creation" } |
        { type: "Edit Channel" } |
        { type: "Cancel Edition" } |
        { type: "Delete Channel" } |
        { type: "Cancel Deletion" } |
        { type: "Create Channel Group" } |
        { type: "Go Employees Management" } |
        { type: "Go Panel" } |
        { type: "Go Next" } |
        { type: "New" } |
        { type: "Save Edit" } |
        { type: "Save Data" } |
        { type: "Go Back 2 Steps" } |
        { type: "Go Back 3 Steps" } |
        { type: "Go" } |
        { type: "Go New Employee" } |
        { type: "Save Employee" } |
        { type: "Go To Edit Employee" } |
        { type: "Go To Get Employee Brief" } |
        { type: "Save" } |
        { type: "Prev" } |
        { type: "Go To Change Status" } |
        { type: "Yes" } |
        { type: "Confirm" } |
        { type: "Reinstate" } |
        { type: "Go Work Areas" } |
        { type: "Chat Sync" } |
        { type: "Sync Completed" } |
        { type: "Reconnect" } |
        { type: "Disconnect" } |
        { type: "Go Connected" } |
        { type: "Send Request" } |
        { type: "Sync" } |
        { type: "Await New Receive" } |
        { type: "Message Sent" } |
        { type: "Message Deleted" } |
        { type: "Channel Created" } |
        { type: "Channel Deleted" } |
        { type: "Channel Updated" } |
        { type: "Edit Success" } |
        { type: "Edit Error" } |
        { type: "Edit Employee" },
    input:
        { tokens: AccessKeys } |
        { credentials: UserCredentials };
    actions: {
        clearCache: () => void;
        setCredentials: ( { tokens }: { tokens: AccessKeys } ) => void;
        sendRequest: () => void;
        updateDataBase: () => void;
    };
}