import { createActorContext } from "@xstate/react";
import AppMachine from "./AppMachine.ts";
import FeaturesMachine from "./FeaturesMachine.ts";
import EmployeesManagementMachine from "./EmployeesManagementMachine.ts";

export const AppContext = createActorContext( AppMachine );
export const FeaturesContext = createActorContext( FeaturesMachine );
export const EmployeesManagementContext = createActorContext( EmployeesManagementMachine );