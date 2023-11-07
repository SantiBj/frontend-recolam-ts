import { useEffect } from "react";
import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types";
import { TripType } from "../../../Models";
import { useDataInputs } from "../../../hooks/useDataInputs";
import { DataEditTrip, DataErrEditTrip } from "../models/types";
import { consultDate } from "../services/consultDate";

const initialForm: InitialDataForm<DataEditTrip, DataErrEditTrip> = {
  inputs: {
    address: "",
    scheduleDay: "",
  },
  errors: {
    address: null,
    scheduleDay: null,
    truck: null,
  },
};

export function useValidationInputs(oldTrip: TripType) {
  const { data, addValueInput, addErrorInput, setFullValueInputs } =
    useDataInputs<DataEditTrip, DataErrEditTrip>(initialForm);

  useEffect(() => {
    if (oldTrip !== null && oldTrip !== undefined) {
      setFullValueInputs({
        address: oldTrip.address!,
        scheduleDay: oldTrip.scheduleDay!,
      });
    }
  }, [oldTrip]);

 async function handleChange(name: string, value: string) {
    addValueInput({ name, value });
    if (name === "address") {
      if (value.trim() === "") {
        addErrorInput("address", "El campo es requerido");
      } else if (value.trim().length < 5) {
        addErrorInput("address", "Escriba una direccion validad");
      } else {
        if (data.errors.address !== null) {
          addErrorInput("address", null);
        }
      }
    } else {
      if (value.trim() === "") {
        addErrorInput("scheduleDay", "La fecha es requeridad");
      } else {
        if (value !== oldTrip.scheduleDay) {
          await consultDate(addErrorInput, value);
        } else {
          if (data.inputs.scheduleDay !== null) {
            addErrorInput("scheduleDay", null);
          }
        }
      }
    }
  }

  return {
    handleChange,
    inputs: data,
    addValueInput,
    addErrorInput,
  };
}
