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
          (errorsForm.document == null ||
            (errorsForm.document !== null && errorsForm.document !== "") ||
            errorsForm.name == null ||
            (errorsForm.name !== null && errorsForm.name !== "") ||
            errorsForm.address == null ||
            (errorsForm.address !== null && errorsForm.address !== "") ||
            errorsForm.numberPhone == null ||
            (errorsForm.numberPhone !== null &&
              errorsForm.numberPhone !== ""))) ||
        (role == "admin" &&
          (errorsForm.document == null ||
            (errorsForm.document !== null && errorsForm.document !== "") ||
            errorsForm.name == null ||
            (errorsForm.name !== null && errorsForm.name !== "")))
          ? "opacity-60 pointer-events-none"
          : ""
      } p-[5px] bg-green-500`}
    >
      crear
    </button>
  );
}
