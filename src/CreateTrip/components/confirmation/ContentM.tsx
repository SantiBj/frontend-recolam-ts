import { useNavigate } from "react-router-dom"
import { useConsult } from "../../../hooks/useConsult"
import { ResetData } from "../../models/types.d.all"
import { DataState } from "../../models/types.d.all"
import { Loading } from "../../../components/Loading"
import { FaHospitalUser } from "react-icons/fa"
import { BtnAcceptM } from "../../../components/BtnAccepM"
import { BtnCancelM } from "../../../components/BtnCancelM"
import { BiCheckCircle,BiErrorAlt } from "react-icons/bi"

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
        <div className="flex flex-col items-center justify-center h-full gap-[8px]">
      {loading && <Loading />}
      {codeState == null && (
        <>
          <div className="text-green-600">
            <FaHospitalUser size={45} />
          </div>
          <div>¿ Desea crear el viaje ?</div>
                    <div className="flex gap-[20px] mt-[20px]">
                        <BtnAcceptM action={createTrip}/>
                        <BtnCancelM action={closeModal}/>
                    </div>
        </>
      )}
      {codeState == 200 && (
        <>
          <div className="text-green-600">
            <BiCheckCircle size={45} />
          </div>
          <div className="text-center">El viaje ha sido creado</div>{" "}
          <div className="flex gap-[20px] mt-[20px]">
            <BtnAcceptM action={success} />
          </div>
        </>
      )}
      {(codeState !== 200) && (codeState !== null) && (
        <>
          <div className="text-red-500">
            <BiErrorAlt size={45} />
          </div>
          <div className="text-center">{mssg}</div>
          <div className="flex gap-[20px] mt-[20px]">
            <BtnAcceptM action={error} />
          </div>
        </>
      )}
    </div>
    );
}