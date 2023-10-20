export interface InitialDataForm<TInp, TErr> {
  inputs: TInp;
  errors: TErr;
}

export interface ValueInputs {
  name: string;
  value: string;
}

export interface Form {
  scheduleDay: string
}

export interface ErrForm {
  scheduleDay: string | null
}