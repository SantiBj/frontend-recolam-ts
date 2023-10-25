import { useNavigate } from "react-router-dom"
import { useConsult } from "../../../hooks/useConsult"
import { ResetData } from "../../models/types.d.all"
import { DataState } from "../../models/types.d.all"
import { Loading } from "../../../components/Loading"

interface Props {
    resetUrlDirectory: () => void
    resetDataTrip: ResetData
    state: DataState
    closeModal: () => void
}

export function ContentM({ resetUrlDirectory, resetDataTrip, state, closeModal }: Props) {

    const { codeState, mssg, loading, fecthingData, resetAll: resetAllConsult } = useConsult("trip-create", "POST")
    const navigate = useNavigate()

    function createTrip(): void {
        if (state.address !== "" && state.truck == "") {
            fecthingData({
                scheduleDay: state.scheduleDay,
                user: state.user,
                address: state.address,
            });
        } else {
            fecthingData(state);
        }
    }

    function resetAllData() {
        resetDataTrip()
        resetAllConsult()
        resetUrlDirectory()
    }

    function success() {
        closeModal()
        resetAllData()
        navigate("/create-trip/scheduleDay")
    }

    function error() {
        closeModal()
        resetAllConsult()
    }


    return (
        <div className="flex flex-col items-center justify-between">
            {loading && <Loading />}
            {codeState == null && (
                <>
                    <div>img createTrip</div>
                    <div>¿ Desea crear el viaje ?</div>
                    <div className="flex ">
                        <button onClick={createTrip}>Aceptar</button>
                        <button onClick={closeModal}>Cancelar</button>
                    </div>
                </>
            )}
            {codeState == 200 && (
                <>
                    <div>imagen de exito</div>
                    <div>El viaje ha sido creado</div>{" "}
                    <div className="flex ">
                        <button onClick={success}>
                            Aceptar
                        </button>
                    </div>
                </>
            )}
            {(codeState !== 200) && (codeState !== null) && (
                <>
                    <div>error</div>
                    <div>{mssg}</div>{" "}
                    <div className="flex ">
                        <button onClick={error}>Aceptar</button>
                    </div>
                </>
            )}
        </div>
    );
}