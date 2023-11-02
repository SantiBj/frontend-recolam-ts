import { useEffect } from "react";
import { StateTripType } from "../Models";
import { useConsult } from "../hooks/useConsult";
import { StateTripUI } from "./StateTrip/StateTripUI";
import { Loading } from "./Loading";
import { Errors } from "./Errors";

interface Props {
  idTrip: string;
}

interface RespConsult {
  status: StateTripType | null;
}

export function StateTrip({ idTrip }: Props) {
  const { fecthingData, codeState, dataConsult, mssg, loading } = useConsult<
    null,
    RespConsult
  >(`state-trip/${idTrip}`);

  useEffect(() => {
    fecthingData();
  }, []);

  if (loading == null || loading) {
    return <Loading />;
  }
  if (codeState !== null && codeState !== 200) {
    <Errors message={mssg} />;
  }
  return <StateTripUI stateTrip={dataConsult?.status!} />;
}
