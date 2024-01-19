import { ChangeEvent } from "react"

type AddCustomer = (e:ChangeEvent<HTMLInputElement>)=>void

export interface CustomerType {
    document:string,
    name:string,
    numberPhone:string
    address:string
    quantityTrips:number
}
