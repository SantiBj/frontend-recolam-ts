import { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { createTrip } from "../context/CreateTrip"
import { useModal } from "../../hooks/useModal"
import { ModalGeneric } from "../../components/ModalGeneric"
import { ContentM } from "../components/confirmation/ContentM"
import { ContentCardsConf } from "../components/confirmation/ContentCardsConf"

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
        return <Navigate to="/create-trip-customer" />
    }

    return (
        <>
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
            <ContentCardsConf stateTrip={state} urlsTrip={urlsTrip} addValueCont={addValueCont} />
            <button
                onClick={openModal}
                className={`bg-green-400 ${state.address === ""
                    ? "opacity-60 pointer-events-none"
                    : "opacity-100 pointer-events-auto"
                    } py-[8px] px-[12px]`}
            >
                crear viaje
            </button>
        </>
    )
}