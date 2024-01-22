import { useEffect, useState } from "react";
import { useConsult } from "../../../hooks/useConsult";
import { InputDate } from "../components/InputDate";
import { ListPaginate, TripType } from "../../../Models";
import { Errors } from "../../../components/Errors";
import { Loading } from "../../../components/Loading";
import { Grid } from "../../../components/Grid";

export function Trips() {
  const [date, setDate] = useState<string>(String(new Date().getDate()));
  const { fecthingData, dataConsult, codeState, mssg, loading } = useConsult<
    null,
    ListPaginate<TripType>
  >(`trips-without-date/${date}?page={}`);

  useEffect(() => {
    fecthingData();
  }, [date]);

  if (!loading) {
    return <Loading />;
  } else if (codeState !== 200) {
    return <Errors message={mssg} />;
  }
  return (
    <>
      <section>
        <InputDate date={date} setDate={setDate} />
      </section>
      <Grid>
        {dataConsult?.results.map((trip) => {
          return <div>{trip.id}</div>;
        })}
      </Grid>
    </>
  );
}
