import { useNavigate } from "react-router-dom";
import { DataFormType, RoleEsType, RoleType } from "../models/types";
import { useMemo } from "react";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { FaMapLocationDot } from "react-icons/fa6"
import { BiCheckCircle,BiErrorAlt } from "react-icons/bi"
import { BtnAcceptM } from "../../../components/BtnAccepM";
import { BtnCancelM } from "../../../components/BtnCancelM";

interface Props {
  role: RoleType;
  roleInSpanish: RoleEsType;
  infoForm: DataFormType;
  closeModal: () => void;
}

export function ContentM({ role, roleInSpanish, infoForm, closeModal }: Props) {
  const navigate = useNavigate();

  useMemo(() => {
    infoForm.role = role;
  }, []);

  const { codeState, mssg, loading, fecthingData, resetAll } = useConsult<>(
    "register",
    "POST",
    infoForm
  );

  function error() {
    resetAll();
    closeModal();
  }

  function success() {
    closeModal();
    resetAll();
    navigate("/create/user");
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-[8px]">
      {loading && <Loading />}
      {codeState == null && (
        <>
          <div className="text-green-600">
            <FaMapLocationDot size={45} />
          </div>
          <div>¿ Desea crear el {roleInSpanish} ?</div>
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
          <div>El {roleInSpanish} ha sido creado</div>{" "}
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
          <div>{mssg}</div>
          <div className="flex gap-[20px] mt-[20px]">
            <BtnAcceptM action={error} />
          </div>
        </>
      )}
    </div>
  );
}
