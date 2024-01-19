import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { decrypt } from "../../../../service/encrypt";
import { useConsult } from "../../../../hooks/useConsult";
import { TripType } from "../../../../Models";
import { StateTruck } from "./types";

export function useLoadInitialTruck() {
  const { idTripEncrypt, newDateTrip } = useParams();
  const idTripDecrypt = useMemo(() => {
    return decrypt(idTripEncrypt!);
  }, []);

  const { dataConsult, codeState, mssg, loading, fecthingData } = useConsult<
    null,
    TripType
  >(`trip/${idTripDecrypt}`);

  const [truckSelected, setTruckSelected] = useState<StateTruck>(null);

  function addValue(value: string) {
    setTruckSelected({
      truck: value,
    });
  }

  useEffect(() => {
    if (dataConsult == null) {
      fecthingData();
    } else {
      setTruckSelected({ truck: dataConsult.truck! });
    }
  }, [dataConsult]);


  return {
    idTripDecrypt,
    idTripEncrypt,
    truckSelected,
    addValue,
    codeState,
    loading,
    mssg,
    newDateTrip
  }
}
