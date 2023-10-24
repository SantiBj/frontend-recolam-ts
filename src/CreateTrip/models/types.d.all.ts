import { AddErrorInput } from "./ScheduleDay/types"

export interface DataState {
    scheduleDay:string
    user:string
    truck:string
    address:string
}

export interface UrlsTrip {
    scheduleDay:string,
    customer:string,
    truck:string
}

export type AddValueCont = (key:string,value:string)=>void
export type ClearValueKey = (key:string)=>void
export type ChangeScheduleDay = (value:string,addErrorInput:AddErrorInput)=>void
export type AddUrlDirectory= (key:string,value:string)=>void


export interface DataContext {
    state:DataState
    urlsTrip:UrlsTrip
    addUrlDirectory:AddUrlDirectory
    addValueCont:AddValueCont
    changeScheduleDay:ChangeScheduleDay
    clearValueKey:ClearValueKey
}