import { useDataInputs } from "../../../hooks/useDataInputs";
import { useModal } from "../../../hooks/useModal";
import { initialDataUser } from "../helpers/InitialDataForm";
import {
  DataFormType,
  ErrFormType,
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

  function handleChange(name: string, value: string) {
    const valueLower = value.toLowerCase()
    addValueInput({ name, value: valueLower });
    validationDataUser(name, value, role, data, addErrorInput);
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

      {(role == "customer" || role == "admin") && (
        <>
          <InputText
            name={"id"}
            label={"Numero de idenficacion :"}
            handleChange={handleChange}
            errors={data.errors.id}
            value={data.inputs.id}
            example={"857946"}
          />
          <InputText
            name={"name"}
            label={"Nombre :"}
            errors={data.errors.name}
            value={data.inputs.name}
            handleChange={handleChange}
            example={"Recolam S.A"}
          />
        </>
      )}
      {role == "customer" && (
        <>
          <InputText
            name={"address"}
            label={"Direccion :"}
            value={data.inputs.address}
            errors={data.errors.address}
            handleChange={handleChange}
            example="Cll 15 #59-90"
          />
          <InputText
            name={"numberPhone"}
            label={"telefono de contacto"}
            value={data.inputs.numberPhone}
            errors={data.errors.numberPhone}
            handleChange={handleChange}
            example={"3223669568"}
          />
        </>
      )}
      {role == "truck" && (
        <InputText
          name={"id"}
          label={"Placa :"}
          handleChange={handleChange}
          errors={data.errors.id}
          value={data.inputs.id}
          example="trj915"
        />
      )}

      <BtnCreateUser
        openModal={openModal}
        role={role}
        errorsForm={data.errors}
      />
    </main>
  );
}
