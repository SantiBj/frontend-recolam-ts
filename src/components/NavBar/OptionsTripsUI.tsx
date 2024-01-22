import { LinkTrip } from "./LinkTrip";
import { MdOutlineKeyboardArrowDown } from "react-icons/md"

interface Props {
    optionsTrips:boolean
}

export function OptionsTripsUI({ optionsTrips }:Props){
    return(
        <>
        <div
          className={`flex hover:cursor-pointer md:justify-center rounded-t-lg w-full md:w-[125px] items-center gap-[8px] ${
            optionsTrips &&
            "bg-[#0DB23C] transition-all"
          }`}
        >
          <p>Viajes</p><span><MdOutlineKeyboardArrowDown size={20}/></span>
        </div>
        <div
          className={`${
            !optionsTrips && "hidden"
          } transition-all flex flex-col w-[125px] items-center bg-[#0DB23C] rounded-b-lg md:absolute md:top-[60px]`}
        >
          <LinkTrip to={"/trip-actives"} text={"Viajes Activos"} />
          <LinkTrip to={"/create-trip/scheduleDay"} text={"Crear Viaje"} />
          <LinkTrip to={"/assign-truck/list"} text={"Asignar Camion"}/>
          <LinkTrip to={"/trips-without-init/"} text={"Iniciar Viaje"} />
          <LinkTrip to={"/trips/new"} text={"Editar Viaje"} />
        </div>
        </>
    
)}