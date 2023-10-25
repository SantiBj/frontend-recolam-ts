
export interface TruckType  {
    placa:string,
    isDisable:boolean
} 

export type AddTruck = (placa:string)=>void