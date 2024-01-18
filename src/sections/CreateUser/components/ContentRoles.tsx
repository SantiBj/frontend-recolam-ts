import { useRef } from "react"
import { CardRole } from "./CardRole"

export function ContentRoles() {
    const url = useRef("/create/user/")

    return (
        <section className="flex flex-col md:flex-row gap-[50px]">
            <CardRole role={"customer"} to={url.current + "customer"} />
            <CardRole role={"admin"} to={url.current + "admin"} />
        </section>
    )
}