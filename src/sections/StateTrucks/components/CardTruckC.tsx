import { useEffect, useState } from "react";
import { TruckType } from "../../../CreateTrip/models/truck/types";
import { CardTruck } from "../../../components/CardTruck";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";

interface Props {
  truck: TruckType;
}

export function CardTruckC({ truck }: Props) {
  const [active, setActive] = useState(truck.isDisable);
  const { dataConsult, codeState, mssg, loading, fecthingData } = useConsult<
    null,
    boolean
  >("disable-truck/" + truck.placa, "PATCH");

  function handleClick() {
    fecthingData();
  }

  useEffect(() => {
    if (codeState == 200) {
      setActive(!active);
    }
  }, [dataConsult]);

  if (loading) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    return <Errors message={mssg} />;
  }

  return (
    <section
      onClick={handleClick}
      className={`${
        active ? "opacity-50" : "opacity-100"
      } bg-[#E6E6E6] w-fit p-[15px] rounded-lg space-y-[10px] transition-all hover:scale-105`}
    >
      <CardTruck stateTrip={{truck:""}} truck={truck} />
    </section>
  );
}
