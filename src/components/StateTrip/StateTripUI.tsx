import { StateTripType } from "../../Models";
import { TbRoad } from "react-icons/tb";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { GiHandTruck } from "react-icons/gi";
import { FaTruckFast } from "react-icons/fa6";

interface Props {
  stateTrip: StateTripType;
}

export function StateTripUI({ stateTrip }: Props) {
  return (
    <section className="flex flex-col items-center gap-[40px]">
      <section className="">
        <p>
          <span className="font-bold text-center">Estado: </span>
          <p className="text-green-800">
            {stateTrip === "ICP" &&
              "Salio de la empresa a la direccion del cliente "}
            {stateTrip === "ICL" && "En la direccion del cliente"}
            {stateTrip === "ECL" &&
              "Salio de la direccion del cliente hacia la empresa"}
            {stateTrip === "ECP" && "Viaje finalizado"}
          </p>
        </p>
      </section>
      <section className="flex flex-col w-fit gap-[50px] md:gap-0 md:flex-row md:w-[85%]">
        <div
          className={`w-[100px] ${
            stateTrip !== null &&
            (stateTrip === "ICP" ||
              stateTrip === "ICL" ||
              stateTrip === "ECL" ||
              stateTrip === "ECP")
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-600"
          }
        h-[15px] rounded-tl-xl rounded-bl-xl flex justify-center items-center`}
        >
          <div className="rounded-full w-[50px] h-[50px] bg-inherit text-white flex justify-center items-center">
            <TbRoad size={25} />
          </div>
        </div>
        <div
          className={`w-[100px] ${
            stateTrip !== null &&
            (stateTrip === "ICL" || stateTrip === "ECL" || stateTrip === "ECP")
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-600"
          } h-[15px] bg- flex items-center justify-center`}
        >
          <div className="rounded-full flex justify-center items-center w-[50px] h-[50px] bg-inherit">
            <GiHandTruck size={23} />
          </div>
        </div>
        <div
          className={`w-[100px] ${
            stateTrip !== null && (stateTrip === "ECL" || stateTrip === "ECP")
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-600"
          } h-[15px] flex items-center justify-center`}
        >
          <div className="rounded-full flex justify-center items-center w-[50px] h-[50px] bg-inherit">
            <FaTruckFast size={23} />
          </div>
        </div>
        <div
          className={`w-[100px] ${
            stateTrip !== null && stateTrip === "ECP"
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-gray-600"
          } h-[15px] flex items-center justify-center rounded-tr-xl rounded-br-xl`}
        >
          <div className="rounded-full flex justify-center items-center w-[50px] h-[50px] bg-inherit">
            <MdOutlineMapsHomeWork size={25} />
          </div>
        </div>
      </section>
    </section>
  );
}
