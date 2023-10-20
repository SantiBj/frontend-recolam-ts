import { createContext, useReducer } from "react";

export const createTrip = createContext<null | {}>(null);

export function CreateTrip({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState, init);
  const value: any = 0;

  return <createTrip.Provider value={value}>{children}</createTrip.Provider>;
}
