import { useMemo } from "react";
import { encrypt } from "../service/encrypt";
import { Link } from "react-router-dom";



// trip -> depende del si es viene de la consulta o si viene camion antes asignado
interface Props {
  trip: any
  to: string,
  assignTruck?: boolean
  editTrip?: boolean
  oldTruckAssigned?: boolean
  queryParams?: string
}

export function CardTrip({
  trip,
  to,
  assignTruck,
  editTrip,
  oldTruckAssigned,
  queryParams,
}: Props) {
  const url = useMemo(() => {
    if (editTrip) {
      return `${to}${encrypt(trip.id)}`;
    } else if (assignTruck) {
      return `${to}${encrypt(trip.id)}/${trip.scheduleDay}`;
    } else {
      return `${to}${encrypt(trip.id)}${queryParams}`;
    }
  }, []);

  return (
    <Link className="bg-white w-[350px] hover:opacity-80 translate-all h-[250px] overflow-y-auto flex items-center p-[20px] rounded-xl" to={url}>
      <article>
        <section>
          {oldTruckAssigned == true && trip?.oldTruckAssigned !== null && (
            <div>Camion antes asignado = {trip?.oldTruckAssigned} </div>
          )}
          {trip?.truckTraveling == true && (
            <div className="">
              Camion con viaje en curso
            </div>
          )}
        </section>
        <section className="flex justify-center items-center gap-[10px]">
          <section>
            <img className="w-[100px]" src="https://www.insurancenavy.com/images/cobertura-de-seguros/encabezado/seguro-para-camiones-de-caja.png" alt="" />
          </section>
          <section className="w-[260px]">
            <ul>
              <li><span className="font-bold" >CC: dddddddd</span>{trip.user.id}</li>
              <li><span className="font-bold ">Nombre: </span>{trip.user.name}</li>
              <li><span className="font-bold">Direccion : </span>{trip.address}</li>
            </ul>
          </section>
        </section>
      </article>
    </Link>
  );
}
