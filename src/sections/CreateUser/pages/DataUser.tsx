import { useParams } from "react-router-dom";
import { RoleEsType, RoleType, RolesEsType } from "../models/types";
import { TittleMajor } from "../../../components/TittleMajor";
import { Title } from "../../../components/Title";
import { ContentInputsData } from "../components/ContentInputsData";

const rolesInSpanish: RolesEsType = {
  customer: "Cliente",
  admin: "Administrador"
};

interface Params {
  [key: string]: RoleType | undefined;
}

export function DataUser() {
  const { role } = useParams<Params>();
  const roleSpanish: RoleEsType = rolesInSpanish[role!];
  
  return (
    <section className="space-y-[120px]">
      <TittleMajor text={"Crear Usuario"} />
      <Title
        to={"/create/user"}
        text={`Datos requeridos para crear un ${roleSpanish}`}
      />
      <ContentInputsData roleInSpanish={roleSpanish} role={role!} />
    </section>
  );
}
