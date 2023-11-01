import { useEffect, useMemo } from "react";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { usePaginate } from "../../../hooks/usePaginate";
import { useConsult } from "../../../hooks/useConsult";
import { Loading } from "../../../components/Loading";
import { Errors } from "../../../components/Errors";
import { ListPaginate, TripType } from "../../../Models";
import { CardTrip } from "../../../components/CardTrip";
import { Pagination } from "../../../components/Pagination";
import { TittleMajor } from "../../../components/TittleMajor";
import { Grid } from "../../../components/Grid";

export function TripsWithoutStart() {
  const { getValueUrl } = useQueryParams();
  const pageInitial = useMemo(() => {
    return parseInt(getValueUrl("page")) || 1;
  }, []);
  const { page, nextPage, prevPage } = usePaginate(pageInitial);
  const { dataConsult, mssg, codeState, fecthingData, loading } = useConsult<
    null,
    ListPaginate<TripType>
  >(`trips-without-initCompany-today?page=${page}`);

  useEffect(() => {
    fecthingData();
  }, []);

  if (loading || loading == null) {
    return <Loading />;
  }
  if (codeState !== 200 && codeState !== null) {
    return <Errors message={mssg} />;
  }
  return (
    <article className="space-y-[150px]">
      <TittleMajor text="Iniciar viajes" />
      <Grid>
        {dataConsult?.results.map((trip) => (
          <CardTrip
            key={trip.id}
            trip={trip}
            to="/trip-without-details/"
            queryParams={`/?page=${page}`}
          />
        ))}
      </Grid>
      {dataConsult !== null &&
        dataConsult?.next !== null &&
        dataConsult?.previous !== null && (
          <Pagination
            dataConsult={{
              next: dataConsult.next,
              previous: dataConsult.previous,
            }}
            page={page}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        )}
    </article>
  );
}
