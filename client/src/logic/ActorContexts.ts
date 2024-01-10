import { createActorContext } from "@xstate/react";
import AppMachine from "./AppMachine.ts";
import { EmployeeManagementMachine } from "./EmployeeManagementMachine.ts";
import EditEmployeeMachine from "./EditEmployeeMachine.tsx";
import { EmployeeBriefMachine } from "./EmployeeBriefMachine.tsx";

export const AppContext = createActorContext( AppMachine );
export const EmployeeManagementContext = createActorContext( EmployeeManagementMachine );
export const EditEmployeeContext = createActorContext( EditEmployeeMachine );

export const EmployeeBriefContext = createActorContext( EmployeeBriefMachine );