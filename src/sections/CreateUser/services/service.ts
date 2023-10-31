import {
  AddErrorInput,
  InitialDataForm,
} from "../../../CreateTrip/models/ScheduleDay/types";
import {
  DataFormType,
  ErrFormType,
  RoleType,
} from "../models/types";

export function validationDataUser(
  name: string,
  value: string,
  role: RoleType,
  info: InitialDataForm<DataFormType, ErrFormType>,
  addErrorInput: AddErrorInput
) {
  value = value.trim();
  switch (name) {
    case "id": {
      const regexAdminAndCustomer: RegExp = /^\d{6,10}$/;
      const regexTruck: RegExp = /^[a-zA-Z]{3}\d{3}$/;

      if (value == "") {
        addErrorInput("id", "El numero de identificacion es requerido");
      } else if (
        role == "truck"
          ? !regexTruck.test(value)
          : !regexAdminAndCustomer.test(value)
      ) {
        if (role == "truck") {
          addErrorInput(
            "id",
            "La placa debe ser de 6 digitos y las letras deben ser mayusculas"
          );
        } else {
          addErrorInput(
            "id",
            "El campo debe ser numerico y debe contener entre 6 y 10 digitos"
          );
        }
      } else {
        if (info.errors.id == null || info.errors.id !== "") {
          addErrorInput("id", "");
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
