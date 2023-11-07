import { ChangeEvent } from "react";
import { CustomInput } from "../../../components/CustomInput";
import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types";
import { DataEditTrip, DataErrEditTrip } from "../models/types";
import { TripType } from "../../../Models";
import { Link } from "react-router-dom";
import { SectionInfoTrip } from "./SectionInfoTrip";
import EDIT from "../../../utils/edit.png";
import NHR from "../../../utils/nhr.png";

interface Props {
  idTripEncrypt: string;
  inputs: InitialDataForm<DataEditTrip, DataErrEditTrip>;
  oldTrip: TripType;
  handleChange: (name: string, value: string) => void;
  openModal: () => void;
}

export function Inputs({
  idTripEncrypt,
  inputs,
  oldTrip,
  handleChange,
  openModal,
}: Props) {
  function change(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  return (
    <>
      <section>
        <img src={EDIT} className="w-[100px] mx-auto my-[40px]" alt="" />
      </section>
      <SectionInfoTrip label="Id viaje :" content={oldTrip.id.toString()} />
      {typeof oldTrip.user === "object" && (
        <SectionInfoTrip label="Cliente :" content={oldTrip.user.name} />
      )}
      <CustomInput
        type={"text"}
        placeholder={"Direccion"}
        onChange={change}
        value={inputs.inputs.address}
        name={"address"}
        error={inputs.errors.address}
      />
      <CustomInput
        type={"date"}
        placeholder={"Dia del viaje"}
        onChange={change}
        value={inputs.inputs.scheduleDay}
        name={"scheduleDay"}
        error={inputs.errors.scheduleDay}
      />

      <section className="transition-all flex p-[15px] gap-[5px] flex-col w-full">
        <p className="font-bold">Camión: </p>
        <div>
          {inputs.errors.truck !== null && <div>{inputs.errors.truck}</div>}
        </div>
        <Link
          to={
            oldTrip.truck == null
              ? `/trip/assign-truck/${idTripEncrypt}/${oldTrip.scheduleDay}`
              : `/trip-edit-truck/${idTripEncrypt}/${inputs.inputs.scheduleDay}`
          }
          className={`border-gray-300 flex gap-3 items-center justify-center pl-[10px] p-[5px] rounded-md border-[1px] ${
            inputs.errors.scheduleDay !== null &&
            "opacity-60 pointer-events-none"
          }`}
        >
          <img src={NHR} className="w-[50px]" />{" "}
          <span className="font-semibold">{oldTrip.truck}</span>
        </Link>
      </section>

      <button
        onClick={openModal}
        className={`${
          (inputs.errors.address !== null ||
            inputs.errors.scheduleDay !== null ||
            inputs.errors.truck !== null ||
            (oldTrip?.address === inputs.inputs.address &&
              oldTrip?.scheduleDay === inputs.inputs.scheduleDay)) &&
          "opacity-60 pointer-events-none"
        } w-full bg-[#2c8d42] p-[5px] rounded-lg text-white font-bold mt-[20px]`}
      >
        Confirmar
      </button>
    </>
  );
}
