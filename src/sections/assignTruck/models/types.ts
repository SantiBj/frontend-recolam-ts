import { DateType } from "../../../Models";

export interface ConsultDates {
    dates:Array<DateType> | null
}

export interface InpTruckType {
    truck: string;
  }
  
export interface ErrTruckType {
    truck: null | string;
  }