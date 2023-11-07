import { useEffect } from "react";
import {
  AddErrorInput,
  InitialDataForm,
} from "../../../CreateTrip/models/ScheduleDay/types";
import { TripType } from "../../../Models";
import { useConsult } from "../../../hooks/useConsult";
import { DataEditTrip, DataErrEditTrip } from "../models/types";

export function useTruckAvailable(
  oldTrip: TripType,
  inputs: InitialDataForm<DataEditTrip, DataErrEditTrip>,
  addErrorInput: AddErrorInput
) {
  const { dataConsult, mssg, codeState, fecthingData, loading } = useConsult<
    null,
    boolean
  >(`truck-available/${inputs.inputs.scheduleDay}/${oldTrip?.truck}`);

  useEffect(() => {
    if (
      oldTrip !== null &&
      inputs.inputs.scheduleDay !== oldTrip.scheduleDay &&
      inputs.errors.scheduleDay == null
    ) {
      fecthingData();
    } else {
      if (inputs.errors.truck !== null) {
        addErrorInput("truck", null);
      }
    }
  }, [inputs.inputs.scheduleDay]);

  useEffect(() => {
    if (dataConsult == false) {
      addErrorInput(
        "truck",
        `El camion ${oldTrip.truck} tiene el cupo completo en la fecha seleccionada`
      );
    } else if (inputs.errors.truck !== null) {
      addErrorInput("truck", null);
    }
  }, [dataConsult]);

  return {
    available: dataConsult,
    load: loading,
    msg: mssg,
    state: codeState,
  };
}
