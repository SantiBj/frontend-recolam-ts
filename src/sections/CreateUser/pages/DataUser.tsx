import { Params, useParams } from "react-router-dom"
import { RoleType } from "../models/types"
import { TittleMajor } from "../../../components/TittleMajor"
import { Title } from "../../../components/Title"

const rolesInSpanish = {
    customer: "Cliente",
    admin: "Administrador",
    truck: "Camion",
}

interface Params {
    [key: string]: RoleType | undefined
}


export function DataUser() {

    const { role } = useParams<Params>()
    const roleSpanish = role !== undefined && rolesInSpanish[role]

    return (
        <section className="space-y-[120px]">
            <TittleMajor text={"Crear Usuario"} />
            <Title to={"/create/user"} text={`Datos requeridos para crear un ${roleSpanish}`} />
            <ContentInputsData roleSpanish={roleSpanish} role={role} />
        </section>
    )
}