import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { createTrip } from "../context/CreateTrip"
import { useModal } from "../../hooks/useModal"
import { ModalGeneric } from "../../components/ModalGeneric"
import { ContentM } from "../components/confirmation/ContentM"
import { ContentCardsConf } from "../components/confirmation/ContentCardsConf"
import { TittleMajor } from "../../components/TittleMajor"
import { Title } from "../../components/Title"

export function Confirmation() {
    const {
        resetUrlDirectory,
        urlsTrip,
        addValueCont,
        state,
        resetDataTrip
    } = useContext(createTrip)

    const { closeModal, openModal, modal } = useModal()

    if (state.user === "") {
        return <Navigate to={urlsTrip.customer} />
    }
    return (
        <article>
            <section className="space-y-[30px]">
               <TittleMajor text="Crear viaje"/>
            <Title text="Resumen del viaje :" to={urlsTrip.truck}/> 
            </section>
            <ModalGeneric
                content={
                    <ContentM
                        resetUrlDirectory={resetUrlDirectory}
                        resetDataTrip={resetDataTrip}
                        state={state}
                        closeModal={closeModal}
                    />
                }
                isOpen={modal}
            />
            <section className="mt-[60px]">
               <ContentCardsConf 
                openModal={openModal} 
                stateTrip={state} 
                urlsTrip={urlsTrip} 
                addValueCont={addValueCont} 
                />
            </section>
            
        </article>
    )
}