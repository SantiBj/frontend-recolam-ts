import { useNavigate } from "react-router-dom"
import { TripType } from "../../../Models"
import { useConsult } from "../../../hooks/useConsult"
import { Loading } from "../../../components/Loading"

interface Props {
    closeModal: () => void
    trip: TripType
}

export function ContentM({ closeModal, trip }: Props) {

    const navigate = useNavigate()
    const { mssg, codeState, resetAll, loading, fecthingData } = useConsult("trip-init-company/" + trip.id, "PATCH")

    function success() {
        closeModal()
        resetAll()
        navigate("/trips-without-init/")
    }

    function error() {
        closeModal()
        resetAll()
    }

    return (
        <div className="flex flex-col items-center justify-between">
            {loading && <Loading />}
            {codeState == null && (
                <>
                    <div>img asignar</div>
                    <div>
                        ¿ Deseas iniciar el viaje del cliente {typeof trip.user === "object" && trip?.user.name} con el camion{" "}
                        {trip.truck} ?
                    </div>
                    <div className="flex ">
                        <button onClick={fecthingData}>Aceptar</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </div>
                </>
            )}
            {codeState == 200 && (
                <>
                    <div>imagen de exito</div>
                    <div>El viaje a sido iniciado con exito </div>{" "}
                    <div className="flex ">
                        <button onClick={success}>Aceptar</button>
                    </div>
                </>
            )}
            {codeState !== 200 && codeState !== null && (
                <>
                    <div>error</div>
                    <div>{mssg}</div>{" "}
                    <div className="flex ">
                        <button onClick={error}>Aceptar</button>
                    </div>
                </>
            )}
        </div>
    )
}