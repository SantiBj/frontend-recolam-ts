import { useParams } from "react-router-dom";
import { useModal } from "../../../../hooks/useModal"
import { decrypt } from "../../../../service/encrypt";
import { useEffect, useMemo, useState } from "react";
import { useConsult } from "../../../../hooks/useConsult";
import { TripType } from "../../../../Models";
import { StateTruck } from "./types";
import { consultDate } from "../../services/consultDate";
import { useLoadInitialTruck } from "./useLoadInitialTruck";
import { Loading } from "../../../../components/Loading";
import { Errors } from "../../../../components/Errors";
import { ModalGeneric } from "../../../../components/ModalGeneric";

export function EditTruck(){

    const { modal,openModal,closeModal } = useModal();
    const {
        idTripDecrypt,
        idTripEncrypt,
        truckSelected,
        addValue,
        codeState,
        loading,
        mssg,
        newDateTrip
      } = useLoadInitialTruck()


    if (loading || loading == null || truckSelected == null){
        return <Loading/>
    }
    if (codeState !== null && codeState !== 200){
        return <Errors message={mssg}/>
    }
    return(
        <article>
            <ModalGeneric
                isOpen={modal}
                content={"acaba el contenido"}
            />
        </article>
    )
}