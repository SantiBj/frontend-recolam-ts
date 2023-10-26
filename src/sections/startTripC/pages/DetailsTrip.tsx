import { useParams } from "react-router-dom"
import { decrypt } from "../../../service/encrypt"
import { useQueryParams } from "../../../hooks/useQueryParams"
import { useEffect, useMemo } from "react"
import { useModal } from "../../../hooks/useModal"
import { useConsult } from "../../../hooks/useConsult"
import { TripType } from "../../../Models"
import { Loading } from "../../../components/Loading"
import { Errors } from "../../../components/Errors"
import { ModalGeneric } from "../../../components/ModalGeneric"
import { NavigateBetweenPages } from "../../../components/NavigateBetweenPages"
import { ContentM } from "../components/ContentM"

export function DetailsTrip() {
    const { trip } = useParams()
    const tripDecrypt = decrypt(trip!)
    const { getValueUrl } = useQueryParams()
    const prevPages = useMemo(() => {
        return getValueUrl("page");
    }, [])
    const { modal, openModal, closeModal } = useModal()
    const { dataConsult, mssg, codeState, fecthingData, loading }
        = useConsult<null, TripType>(`trip/${tripDecrypt}`)

    //validando si el camion esta en otro viaje activo
    const {
        dataConsult: response,
        mssg: mssError,
        codeState: status,
        fecthingData: consult,
        loading: loadingConsult,
    } = useConsult(`truck-is-busy/${tripDecrypt}`);

    useEffect(() => {
        consult();
        fecthingData();
    }, []);


    if (loading || loading == null || loadingConsult || loadingConsult == null) {
        return <Loading />;
    }
    if (codeState !== null && codeState !== 200) {
        return <Errors message={mssg} />;
    }
    if (status !== null && status !== 200) {
        return <Errors message={mssError} />;
    }
    return (
        <article className="space-y-[10px]">
            <ModalGeneric
                isOpen={modal}
                content={<ContentM closeModal={closeModal} trip={dataConsult!} />}
            />
            <NavigateBetweenPages
                prev={`/trips-without-init/?page=${prevPages}`}
            />
            <section>
                <div>Dia del viaje = {dataConsult?.scheduleDay}</div>
                <div>Cliente = {dataConsult !== null && typeof dataConsult.user === "object" && dataConsult?.user.name}</div>
                <div>Camion = {dataConsult?.truck}</div>
                <div>Direccion = {dataConsult?.address}</div>
            </section>
            <section>
                <button
                    className={`${dataConsult?.initialDateCompany !== null &&
                        "opacity-60 pointer-events-none"
                        } ${response === true && "opacity-60 pointer-events-none"
                        } border-green-500 border-[2px] p-[5px]`}
                    onClick={openModal}
                >
                    Iniciar Viaje
                </button>
            </section>
        </article>
    )
}