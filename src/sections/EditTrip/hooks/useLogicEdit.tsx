import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { decrypt } from "../../../service/encrypt";
import { TripType } from "../../../Models";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { useConsult } from "../../../hooks/useConsult";
import { useValidationInputs } from "./useValidationInputs";
import { useTruckAvailable } from "./useTruckAvailable";

export function useLogicEdit() {
  const { getValueUrl } = useQueryParams();
  const { idTripEncript } = useParams();
  const idDecrypt = useMemo(() => {
    return decrypt(idTripEncript!);
  }, []);
  const { dataConsult, codeState, mssg, fecthingData, loading } = useConsult<
    null,
    TripType
  >(`trip/${idDecrypt}`);

  const initialData: TripType | undefined = useMemo(() => {
    if (dataConsult !== null) {
      const date = getValueUrl("date");
      if (date !== "") {
        return {
          ...dataConsult,
          scheduleDay: date,
        };
      } else {
        return dataConsult;
      }
    }
  }, [dataConsult]);

  const { handleChange, inputs, addErrorInput } = useValidationInputs(
    initialData!
  );

  useEffect(() => {
    fecthingData();
  }, []);

  const { available, load, msg, state } = useTruckAvailable(
    dataConsult!,
    inputs,
    addErrorInput
  );

  return {
    loading,
    load,
    codeState,
    mssg,
    state,
    msg,
    inputs,
    handleChange,
    oldTrip:dataConsult,
    idTripEncript,
    available
  };
}
