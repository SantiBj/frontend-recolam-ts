import { Link } from "react-router-dom";
import { TripType } from "../../../Models";
import { BiTrip } from "react-icons/bi";
import { encrypt } from "../../../service/encrypt";
import { useMemo } from "react";

interface Props {
  trip: TripType;
}

export function CardTrip({ trip }: Props) {

    const idTripEncript = useMemo(()=>(
        encrypt(trip.id)
    ),[trip.id])

  return (
    <Link to={`trip-without-details/${idTripEncript}`} className="transition-all gap-[10px] hover:scale-110 p-[20px] bg-white rounded-md w-[180px] h-[180px] flex flex-col justify-center items-center">
      <BiTrip size={50} />
      <div className="overflow-auto">
        <p>
          <span className="font-semibold">Id-viaje: </span>
          {trip.id}
        </p>
        <p>
          <span className="font-semibold">Cliente: </span>
          {trip.user.toString()} kkkkkkkjfjdjdjdjd djjdjddj
        </p>
        <p>
          <span className="font-semibold">Fecha: </span>
          {trip.scheduleDay}
        </p>
        {trip.truck !== null && (
          <p>
            <span className="font-semibold">Camion: </span>
            {trip.truck}
          </p>
        )}
      </div>
    </Link>
  );
}
