import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useConsult } from "../../../hooks/useConsult";
import { createTrip } from "../../../CreateTrip/context/CreateTrip";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { ListPaginate, TripType } from "../../../Models";
import { ChangeDateType } from "../models/types";

export function useLogicData(page: number) {
  const { state, resetDataTrip, resetUrlDirectory } = useContext(createTrip);
  const { getValueUrl } = useQueryParams();
  const [date, setDate] = useState<string>(
    useMemo(() => {
      return getValueUrl("date") || "";
    }, [])
  );

  const {
    dataConsult: datesConsulted,
    codeState,
    mssg,
    loading,
    fecthingData,
  } = useConsult<null, Array<string>>("date-trips-without-start");

  const {
    dataConsult: trips,
    setDataConsult: setTrips,
    codeState: statusConsult,
    mssg: msg,
    loading: load,
    fecthingData: consultTrips,
  } = useConsult<null, ListPaginate<TripType>>(
    `trips-without-start/${date}?page=${page}`
  );

  useEffect(() => {
    fecthingData();
    if (state.scheduleDay !== "") {
      resetDataTrip();
      resetUrlDirectory();
    }
  }, []);

  useEffect(() => {
    if (date !== "") {
      consultTrips();
    } else {
      setTrips(null);
    }
  }, [date, page]);

  const changeDate: ChangeDateType = (newDate) => {
    setDate(newDate);
  };

  const fullLoading = useRef<boolean>(false);

  if (loading == null || loading || load) {
    fullLoading.current = true;
  } else {
    fullLoading.current = false;
  }

  const fullMssg = useRef<null | string>(null);

  if (codeState !== null && codeState !== 200) {
    fullMssg.current = mssg;
  } else if (statusConsult !== null && statusConsult !== 200) {
    fullMssg.current = msg;
  } else {
    fullMssg.current = null;
  }

  return {
    trips,
    changeDate,
    datesConsulted,
    date,
    loading: fullLoading.current,
    mssg: fullMssg.current,
  };
}
