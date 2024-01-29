import { CustomerType } from "./CreateTrip/models/customer/types";

export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type Body<B> = B | null;

export interface Headers {
  method: Method;
  body: string | null;
  headers: {
    "Content-type": string;
    Authorization: string;
  };
}

export type GetValueUrl = (param: string) => string;
export type AddValueUrl = (
  url: string,
  key: string,
  value: string | number
) => void;

export interface TripType {
  id: number;
  user: string | CustomerType;
  address: string | null;
  details: string | null;
  scheduleDay: string;
  initialDateCompany: string | null;
  endDateCompany: string | null;
  initialDateCustomer: string | null;
  endDateCustomer: string | null;
  isComplete: boolean | null;
  deleteDate: string | null;
  cancelDate: string | null;
  truck: string | null;
  truckBusy?:boolean;
}

export interface Truck {
  
}

export type DateType = string 

export interface DataPagination {
  next: string | null | undefined;
  previous: string | null | undefined;
}

export interface ListPaginate<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export type StateTripType = "ICP" | "ICL" | "ECL" | "ECP"