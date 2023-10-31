import { ErrFormType, RoleType } from "../models/types";

interface Props {
  errorsForm: ErrFormType;
  role: RoleType;
  openModal: () => void;
}

export function BtnCreateUser({ errorsForm, role, openModal }: Props) {
  return (
    <button
      onClick={openModal}
      className={`${
        (role == "customer" &&
          (errorsForm.id == null ||
            (errorsForm.id !== null && errorsForm.id !== "") ||
            errorsForm.name == null ||
            (errorsForm.name !== null && errorsForm.name !== "") ||
            errorsForm.address == null ||
            (errorsForm.address !== null && errorsForm.address !== "") ||
            errorsForm.numberPhone == null ||
            (errorsForm.numberPhone !== null &&
              errorsForm.numberPhone !== ""))) ||
        (role == "admin" &&
          (errorsForm.id == null ||
            (errorsForm.id !== null && errorsForm.id !== "") ||
            errorsForm.name == null ||
            (errorsForm.name !== null && errorsForm.name !== ""))) ||
        (role == "truck" &&
          (errorsForm.id == null ||
            (errorsForm.id !== null && errorsForm.id !== "")))
          ? "opacity-60 pointer-events-none"
          : ""
      } p-[5px] bg-green-500`}
    >
      crear
    </button>
  );
}
