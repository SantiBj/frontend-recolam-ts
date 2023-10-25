import { ChangeEvent } from "react"

type AddCustomer = (e:ChangeEvent<HTMLInputElement>)=>void

export interface CustomerType {
    id:string,
    name:string,
    numberPhone:string
}
