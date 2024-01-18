import {
  AddErrorInput,
  InitialDataForm,
} from "../../../CreateTrip/models/ScheduleDay/types";
import {
  DataFormType,
  ErrFormType,
  NameInput
} from "../models/types";

export function validationDataUser(
  name: NameInput,
  value: string,
  info: InitialDataForm<DataFormType, ErrFormType>,
  addErrorInput: AddErrorInput
) {
  value = value.trim();
  switch (name) {
    case "document": {
      const regexAdminAndCustomer: RegExp = /^\d{6,10}$/;
      //const regexTruck: RegExp = /^[a-zA-Z]{3}\d{3}$/;
      console.log(value)
      if (value == "") {
        addErrorInput("document", "El numero de identificacion es requerido");
      } else if (!regexAdminAndCustomer.test(value)) {
        addErrorInput(
          "document",
          "El campo debe ser numerico y debe contener entre 6 y 10 digitos"
        );
      } else {
        if (info.errors.document == null || info.errors.document !== "") {
          addErrorInput("document", "");
        }
      }
      break;
    }
    case "name": {
      const regexName: RegExp = /^[a-zA-Z\s]{4,40}$/;
      if (value == "") {
        addErrorInput("name", "El nombre es requerido");
      } else if (!regexName.test(value)) {
        addErrorInput(
          "name",
          "El nombre deber ser minimo de 3 caracteres, maximo de 40 y solo letras"
        );
      } else {
        if (info.errors.name == null || info.errors.name !== "") {
          addErrorInput("name", "");
        }
      }
      break;
    }
    case "address": {
      if (value == "") {
        addErrorInput("address", "La direccion es requeridad");
      } else {
        if (info.errors.address == null || info.errors.address !== "") {
          addErrorInput("address", "");
        }
      }
      break;
    }

    case "numberPhone": {
      const regexPhone: RegExp = /^\d{7,10}$/;
      if (value == "") {
        addErrorInput("numberPhone", "El numero de telefono es requerido");
      } else if (!regexPhone.test(value)) {
        addErrorInput(
          "numberPhone",
          "El campo requiere solo numero y un rango de valores de entre 7 y 10."
        );
      } else {
        if (info.errors.numberPhone == null || info.errors.numberPhone !== "") {
          addErrorInput("numberPhone", "");
        }
      }
      break;
    }
  }
}
