import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/Loading";
import { BtnAcceptM } from "../../../components/BtnAccepM";
import { BtnCancelM } from "../../../components/BtnCancelM";
import { TripType } from "../../../Models";
import { DataEditTrip } from "../models/types";
import { useConsult } from "../../../hooks/useConsult";
import { FaMapLocationDot } from "react-icons/fa6";
import { BiCheckCircle,BiErrorAlt } from "react-icons/bi"

interface Props {
  closeModal: () => void
  newTrip:DataEditTrip
  oldTrip:TripType
}

export function ContentM({ closeModal,newTrip,oldTrip }: Props) {
  const navigate = useNavigate();

  const { codeState, mssg, loading, fecthingData, resetAll } = useConsult<DataEditTrip,null>(
    `trip-update/${oldTrip.id}`,
    "PATCH",
    newTrip
  );

  function error() {
    resetAll();
    closeModal();
  }

  function success() {
    closeModal();
    resetAll();
    navigate(`/trips/?date=${newTrip.scheduleDay}`);
  }

  return (
    <article className="flex flex-col justify-center items-center h-full gap-[8px]">
      {loading && <Loading />}
      {codeState == null && (
        <>
          <div className="text-green-600">
            <FaMapLocationDot size={45} />
          </div>
          <div>¿ Desea editar el viaje ?</div>
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
          <div className="text-center">El viaje a sido editado con exito</div>{" "}
          <div className="flex gap-[20px] mt-[20px]">
            <BtnAcceptM action={success} />
          </div>
        </>
      )}
      {codeState !== 200 && codeState !== null && (
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
    </article>
  );
}
