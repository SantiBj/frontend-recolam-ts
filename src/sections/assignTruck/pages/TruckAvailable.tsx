import { useParams } from "react-router-dom";
import { decrypt } from "../../../service/encrypt";
import { useConsult } from "../../../hooks/useConsult";
import { useEffect, useMemo } from "react";
import { useDataInputs } from "../../../hooks/useDataInputs";
import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types";
import { useModal } from "../../../hooks/useModal";
import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { ModalGeneric } from "../../../components/ModalGeneric";
import { ContentM } from "../components/ContentM";
import { TripType } from "../../../Models";
import { ContentTrucks } from "../components/ContentTrucks";
import { TittleMajor } from "../../../components/TittleMajor";
import { Title } from "../../../components/Title";
import { ErrTruckType, InpTruckType } from "../models/types";
import { InfoTrip } from "../components/InfoTrip";

const initialTruck: InitialDataForm<InpTruckType, ErrTruckType> = {
  inputs: {
    truck: "",
  },
  errors: {
    truck: null,
  },
};

export function TruckAvailable() {
  const { trip, date } = useParams();
  const tripDecrypt = decrypt(trip!);

  const { dataConsult, codeState, mssg, loading, fecthingData } = useConsult<
    null,
    TripType
  >(`trip/${tripDecrypt}`);


  useEffect(() => {
    fecthingData();
  }, []);

  const { data, addValueInput } = useDataInputs<InpTruckType, ErrTruckType>(
    initialTruck
  );
  const { modal, closeModal, openModal } = useModal();
  const text = useMemo(() => {
    return `¿Desea asignar el camion ${data.inputs.truck} al viaje ${tripDecrypt}?`;
  }, [data.inputs.truck]);

  if (loading == null || loading) {
    return <Loading />;
  }
  if (codeState !== 200 && codeState !== null) {
    return <Errors message={mssg} />;
  }
  return (
    <article className="space-y-[100px]">
      <ModalGeneric
        content={
          <ContentM
            closeModal={closeModal}
            text={text}
            tripDecrypt={tripDecrypt}
            truck={data.inputs.truck}
          />
        }
        isOpen={modal}
      />
      <section className="space-y-[50px]">
        <TittleMajor text="Asignar Camión" />
        <Title
          to={`/assign-truck/list/?date=${
            dataConsult !== null && dataConsult.scheduleDay
          }`}
          text="Seleccione el camion que asignara al viaje:"
        />
      </section>

      <InfoTrip data={data} dataConsult={dataConsult} />

      <ContentTrucks
        date={date!}
        inputTruck={data.inputs}
        addValueInput={addValueInput}
      />
      <section className="w-full flex justify-end">
        <button
          onClick={openModal}
          className={`${
            data.inputs.truck !== ""
              ? "opacity-100 pointer-events-auto"
              : "opacity-60 pointer-events-none"
          } bg-[#2c8d42] p-[10px] text-white font-semibold rounded-md`}
        >
          Asignar Camión
        </button>
      </section>
    </article>
  );
}
