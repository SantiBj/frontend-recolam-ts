import { useMemo } from "react";
import { encrypt } from "../service/encrypt";
import { Link } from "react-router-dom";
import { TripType } from "../Models";


// trip -> depende del si es viene de la consulta o si viene camion antes asignado
interface Props{
    trip:any
    to:string,
    assignTruck?:boolean
    editTrip?:boolean
    oldTruckAssigned?:boolean
    queryParams?:string
}

export function CardTrip({
  trip,
  to,
  assignTruck,
  editTrip,
  oldTruckAssigned,
  queryParams,
}:Props) {
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
    <div className="border-[1px] border-gray-400">
      <Link to={url}>
        <h1 key={trip.id}>
          {oldTruckAssigned == true && trip?.oldTruckAssigned !== null && (
            <div>Camion antes asignado = {trip?.oldTruckAssigned} </div>
          )}
          {trip?.truckTraveling == true && (
            <div className="bg-blue-200 p-[4px] text-center">
              Camion con viaje en curso
            </div>
          )}
          {trip.id}-{trip.user.id}-{trip.user.name}-{trip.address}{" "}
        </h1>
      </Link>
    </div>
  );
}
