import { useState } from "react";
import {
  AddErrorInput,
  AddValueInput,
  InitialDataForm,
} from "../CreateTrip/models/ScheduleDay/types";

export function useDataInputs<TInp, TErr>(
  dataInitial: InitialDataForm<TInp, TErr>
) {
  const [data, setData] = useState<InitialDataForm<TInp, TErr>>(dataInitial);

  const addValueInput: AddValueInput = ({ name, value }) => {
    const template = {
      ...data,
      inputs: {
        ...data.inputs,
        [name]: value,
      },
    };
    setData(template);
  };

  // se utiliza funcion para usar el estado mas reciente y no el antiguo
  // ya que puede ocurrir que la momento de usar addError el estado no este actualizado
  // y se use por ende el antiguo

  const addErrorInput: AddErrorInput = (name, msg) => {
    setData((prevData) => ({
      ...prevData,
      errors: {
        ...prevData.errors,
        [name]: msg,
      },
    }));
  };

  function setFullValueInputs(newData: TInp) {
    setData({
      ...data,
      inputs: newData,
    });
  }

  return {
    data,
    setFullValueInputs,
    addValueInput,
    addErrorInput,
  };
}
