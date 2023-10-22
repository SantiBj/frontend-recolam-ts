export interface InitialDataForm<TInp, TErr> {
  inputs: TInp;
  errors: TErr;
}

export interface ValueInputs {
  name: string;
  value: string;
}

export type AddErrorInput = (name, msg) => void

export interface Form {
  scheduleDay: string
}

export interface ErrForm {
  scheduleDay: string | null
}