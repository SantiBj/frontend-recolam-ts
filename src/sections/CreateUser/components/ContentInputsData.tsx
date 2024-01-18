import { useDataInputs } from "../../../hooks/useDataInputs";
import { useModal } from "../../../hooks/useModal";
import { initialDataUser } from "../helpers/InitialDataForm";
import {
  DataFormType,
  ErrFormType,
  NameInput,
  RoleEsType,
  RoleType,
} from "../models/types";
import { validationDataUser } from "../services/service";
import { InputText } from "./InputText";
import { ModalGeneric } from "../../../components/ModalGeneric";
import { BtnCreateUser } from "./BtnCreateUser";
import { ContentM } from "./ContentM";

interface Props {
  role: RoleType;
  roleInSpanish: RoleEsType;
}

export function ContentInputsData({ role, roleInSpanish }: Props) {
  const { modal, openModal, closeModal } = useModal();
  const { data, addValueInput, addErrorInput } = useDataInputs<
    DataFormType,
    ErrFormType
  >(initialDataUser);

  function handleChange(name: NameInput, value: string) {
    const valueLower = value.toLowerCase();
    addValueInput({ name, value: valueLower });
    validationDataUser(name, value, data, addErrorInput);
  }


  return (
    <main className="flex flex-col gap-[20px] bg-white p-[70px] rounded-2xl w-[70%] mx-auto md:w-[40%] max-w-[600px]">
      <ModalGeneric
        content={
          <ContentM
            role={role}
            roleInSpanish={roleInSpanish}
            infoForm={data.inputs}
            closeModal={closeModal}
          />
        }
        isOpen={modal}
      />
      <InputText
        name={"document"}
        label={"Numero de idenficacion :"}
        handleChange={handleChange}
        errors={data.errors.document}
        value={data.inputs.document}
        example={"857946"}
      />
      <InputText
        name={"name"}
        label={"Nombre :"}
        errors={data.errors.name}
        value={data.inputs.name}
        handleChange={handleChange}
        example={role ===  "admin" ? "Admin 1" : "Recolam S.A" }
      />
      {
        role == "customer" && <>
          <InputText
          name={"address"}
          label={"Direccion :"}
          errors={data.errors.address}
          value={data.inputs.address}
          handleChange={handleChange}
          example={"Calle 20 #20-41 Puente Aranda"}
          />
          <InputText
            name={"numberPhone"}
            label={"Numero de telefono :"}
            errors={data.errors.numberPhone}
            value={data.inputs.numberPhone}
            handleChange={handleChange}
            example={"3125367452"}
          />
        </>
      }
      <BtnCreateUser
        openModal={openModal}
        role={role}
        errorsForm={data.errors}
      />
    </main>
  );
}
