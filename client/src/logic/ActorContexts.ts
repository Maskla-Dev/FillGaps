import { createActorContext } from "@xstate/react";
import AppMachine from "./AppMachine.ts";

export const AppContext = createActorContext( AppMachine );