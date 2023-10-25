import { useContext } from "react";
import { Title } from "../../components/Title";
import { TittleMajor } from "../../components/TittleMajor";
import { BtnContinue } from "../components/scheduleDay/BtnContinue";
import { createTrip } from "../context/CreateTrip";
import { ContentCardsCust } from "../components/customer/ContentCardsCust";

export function Customer() {

    const { state, addValueCont , urlsTrip ,addUrlDirectory } = useContext(createTrip)

    return (
        <div>
            <div className="space-y-[30px]">
                <TittleMajor text={"Crear Viaje"} />
                <Title
                    to={urlsTrip.scheduleDay}
                    text={`Lista de clientes con menos de 3 viajes el ${state.scheduleDay}`}
                />
            </div>

            <div className="space-y-[70px] mt-[100px]">
                <ContentCardsCust
                    addUrlDirectory={addUrlDirectory}
                    addValueCont={addValueCont}
                    state={state}
                />
                <div
                    className={`flex justify-end mx-auto ${state.user === ""
                        ? "opacity-60 pointer-events-none"
                        : "opacity-100 pointer-events-auto"
                        }`}
                >
                    <BtnContinue to={urlsTrip.truck} />
                </div>
            </div>
        </div>
    )
}