import { InitialDataState, TypeActionRed } from "../models/typesContext";

export const initialState: InitialDataState = {
  scheduleDay: "",
  user: "",
  truck: "",
  address: "",
};

interface Action {
    type:TypeActionRed
    payload?:string
}


export function reducer(state:InitialDataState,action){
    switch (action.type) {
        case value:
            
            break;
    
        default:
            break;
    }
}