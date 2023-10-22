import { AddErrorInput } from "./ScheduleDay/types"

export interface DataState {
    scheduleDay:string,
    user:string,
    truck:string
    address:string
}

export type AddValueCont = (key:string,value:string)=>void
export type ClearValueKey = (key:string)=>void
export type ChangeScheduleDay = (value:string,addErrorInput:AddErrorInput)

export interface DataContext {
    state:DataState,
    addValueCont:AddValueCont,
    changeScheduleDay:ChangeScheduleDay,
    clearValueKey:ClearValueKey
}