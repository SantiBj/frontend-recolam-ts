import { Outlet } from "react-router-dom";
import { InternalNav } from "../components/InternalNav";

export function Trips(){
    return(
        <section>
            <InternalNav/>
            <Outlet/>
        </section>
    )
}