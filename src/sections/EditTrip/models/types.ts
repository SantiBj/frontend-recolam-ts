export type ChangeDateType = (newDate: string) => void;

export interface DataErrEditTrip {
  address: string | null;
  scheduleDay: string | null;
  truck: string | null;
}

export interface DataEditTrip {
  address: string;
  scheduleDay: string;
}
