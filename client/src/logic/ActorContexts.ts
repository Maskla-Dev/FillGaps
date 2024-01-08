import { createActorContext } from "@xstate/react";
import AppMachine from "./AppMachine.ts";
import { EmployeeManagementMachine } from "./EmployeeManagementMachine.ts";
import EditEmployeeMachine from "./EditEmployeeMachine.tsx";

export const AppContext = createActorContext( AppMachine );
export const EmployeeManagementContext = createActorContext( EmployeeManagementMachine );
export const EditEmployeeContext = createActorContext( EditEmployeeMachine );