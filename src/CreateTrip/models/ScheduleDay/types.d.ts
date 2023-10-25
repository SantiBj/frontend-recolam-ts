export interface InitialDataForm<TInp, TErr> {
  inputs: TInp;
  errors: TErr;
}

export interface ValueInputs {
  name: string;
  value: string;
}

export type AddValueInput = (data:ValueInputs)=>void
export type AddErrorInput = (name:string, msg:string | null) => void

export interface Form {
  scheduleDay: string
}

export interface ErrForm {
  scheduleDay: string | null
}