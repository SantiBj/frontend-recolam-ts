import { useNavigate } from "react-router-dom";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { BtnAcceptM } from "../../../components/BtnAccepM";
import { BtnCancelM } from "../../../components/BtnCancelM";
import { FaTruckMoving } from "react-icons/fa";
import { BiCheckCircle, BiErrorAlt } from "react-icons/bi";

interface Props {
  closeModal: () => void;
  text: string;
  tripDecrypt: string;
  truck: string;
}

export function ContentM({ closeModal, text, tripDecrypt, truck }: Props) {
  const { codeState, mssg, resetAll, loading, fecthingData } = useConsult(
    `add-truck-trip/${tripDecrypt}/${truck}`,
    "PATCH"
  );
  const navigate = useNavigate();

  function success() {
    closeModal();
    resetAll();
    navigate("/assign-truck/list");
  }

  function error() {
    closeModal();
    resetAll();
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-[8px]">
      {loading && <Loading />}
      {codeState == null && (
        <>
          <div className="text-green-600">
            <FaTruckMoving size={45} />
          </div>
          <div className="text-center">{text}</div>
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
          <div className="text-center">
            El camion ha sido asignado con exito.
          </div>{" "}
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
    </div>
  );
}
