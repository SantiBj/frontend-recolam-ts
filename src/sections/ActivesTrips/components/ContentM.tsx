import { useNavigate } from "react-router-dom";
import { TripType } from "../../../Models";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { BtnAcceptM } from "../../../components/BtnAccepM";
import { BtnCancelM } from "../../../components/BtnCancelM";
import { MdModeOfTravel } from "react-icons/md"
import { BiCheckCircle,BiErrorAlt } from "react-icons/bi"

interface Props {
    trip: TripType | null
    closeModal: () => void
}

export function ContentM({ trip, closeModal }: Props) {
    const { codeState, resetAll, mssg, loading, fecthingData } = useConsult("trip-end-company/" + trip?.id, 'PATCH')
    const navigate = useNavigate()

    function success(){
        closeModal()
        resetAll()
        navigate("/trip-activates")
    }

    function error(){
        closeModal()
        resetAll()
    }

    return (
        
        <div className="flex flex-col items-center justify-center h-full gap-[8px]">
        {loading && <Loading />}
        {codeState == null && (
          <>
            <div className="text-green-600">
              <MdModeOfTravel size={45} />
            </div>
            <div>¿ Deseas finalizar el viaje del cliente {typeof trip?.user === "object" && trip?.user.name} con el
                camion {trip?.truck} ?</div>
            <div className="flex gap-[20px] mt-[20px]">
              <BtnAcceptM action={fecthingData} />
              <BtnCancelM action={closeModal} />
            </div>
          </>
        )}
        {codeState == 200 && (
          <>
            <div className="text-green-600">
              <BiCheckCircle size={45} />
            </div>
            <div className="text-center">El viaje a finalizado con exito </div>{" "}
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