import { useNavigate } from "react-router-dom"
import { useConsult } from "../../../hooks/useConsult"
import { Loading } from "../../../components/Loading"

interface Props {
    closeModal: () => void
    text: string
    tripDecrypt: string,
    truck: string
}

export function ContentM({ closeModal, text, tripDecrypt, truck }: Props) {

    const { codeState, mssg, resetAll, loading, fecthingData } = useConsult(`add-truck-trip/${tripDecrypt}/${truck}`, "PATCH")
    const navigate = useNavigate()

    function success() {
        closeModal()
        resetAll()
        navigate("/assign-truck/list")
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
                    <div>{text}</div>
                    <div className="flex ">
                        <button onClick={fecthingData}>Aceptar</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </div>
                </>
            )}
            {codeState == 200 && (
                <>
                    <div>imagen de exito</div>
                    <div>El camion ha sido asignado con exito </div>{" "}
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