import { InitialDataForm } from "../../../CreateTrip/models/ScheduleDay/types";
import { TripType } from "../../../Models";
import { ErrTruckType, InpTruckType } from "../models/types";

interface Props {
  data:InitialDataForm<InpTruckType, ErrTruckType>
  dataConsult:TripType | null
}

export function InfoTrip({ data,dataConsult }:Props) {
  return (
    <section className="bg-white capitalize p-[50px] space-y-[10px] w-[85%] md:w-[60%] max-w-[500px] mx-auto rounded-xl">
      <h3 className="text-center font-bold text-lg">Datos del viaje</h3>
      {data.inputs.truck !== null && (
        <div>
          {" "}
          <span className="font-bold">Camion Seleccionado: </span>
          <span className="text-green-800">{data.inputs.truck}</span>
        </div>
      )}

      <div>
        <span className="font-bold">Fecha del viaje: </span>
        {dataConsult !== null && dataConsult.scheduleDay}
      </div>
      <div>
        {dataConsult !== null && typeof dataConsult.user === "object" && (
          <section className="flex-col">
            <p>
              <span className="font-bold">Cliente: </span>
              {dataConsult.user.name}
            </p>{" "}
            <p>
              <span className="font-bold">Id: </span>
              {dataConsult.user.id}
            </p>
          </section>
        )}
      </div>
      <div>
        <span className="font-bold">Direccion: </span>
        {dataConsult !== null && dataConsult.address}
      </div>
    </section>
  );
}
