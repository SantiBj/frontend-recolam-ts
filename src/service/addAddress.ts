import {
  AddErrorInput,
  AddValueInput,
} from "../CreateTrip/models/ScheduleDay/types";
import { ErrInputs } from "../CreateTrip/models/confirmation/types";
import { AddValueCont, DataState } from "../CreateTrip/models/types.d.all";

export function addAddress(
  value: string,
  addValueCont: AddValueCont,
  addValueInputs: AddValueInput,
  addErrorInput: AddErrorInput,
  errors: ErrInputs,
  stateTrip: DataState
) {
  addValueInputs({ name: "address", value: value });
  if (value.trim() !== "") {
    if (value.length > 5) {
      addValueCont("address", value);
      if (errors !== null) {
        addErrorInput("address", null);
      }
    } else {
      if (stateTrip.address !== "") {
        addValueCont("address", "");
      }
      addErrorInput("address", "El campo debe contener minimo 5 caracteres");
    }
  } else {
    if (stateTrip.address !== "") {
      addValueCont("address", "");
    }
    addErrorInput("address", "El campo es requerido");
  }
}
