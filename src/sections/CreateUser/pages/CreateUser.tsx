import { Title } from "../../../components/Title";
import { TittleMajor } from "../../../components/TittleMajor";
import { ContentRoles } from "../components/ContentRoles";

export function CreateUser() {
    return (
        <section className="space-y-[100px]">
            <TittleMajor text={"Crear Usuario"} />
            <Title text={"Selecione un rol : "} />
            <section>
                <ContentRoles />
            </section>
        </section>
    )
}